"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Dropzone from "dropzone";
import { toast } from "sonner";
import type { DesignRecord } from "@/types/design";
import { useUpdateDesign } from "@/hooks/use-design";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

const EditDesignModal = ({ design, children }: { design: DesignRecord; children: React.ReactNode }) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(design.title);
    const [description, setDescription] = useState(design.description ?? "");
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState(design.url);
    const dropzoneElement = useRef<HTMLDivElement>(null);
    const dropzoneInstance = useRef<Dropzone | null>(null);
    const initializationFrame = useRef<number | null>(null);
    const updateDesign = useUpdateDesign();

    const mountDropzone = useCallback((node: HTMLDivElement | null) => {
        if (initializationFrame.current !== null) {
            cancelAnimationFrame(initializationFrame.current);
            initializationFrame.current = null;
        }
        dropzoneInstance.current?.destroy();
        dropzoneInstance.current = null;
        dropzoneElement.current = node;
        if (!node) return;

        initializationFrame.current = requestAnimationFrame(() => {
            initializationFrame.current = null;
            if (dropzoneElement.current !== node) return;

            const dropzone = new Dropzone(node, {
                url: "/",
                autoProcessQueue: false,
                clickable: true,
                acceptedFiles: "image/*",
                maxFilesize: 64,
                maxFiles: 1,
                previewsContainer: false,
                hiddenInputContainer: node,
            });

            dropzone.on("addedfile", (addedFile) => {
                if (!addedFile.type.startsWith("image/")) {
                    dropzone.removeFile(addedFile);
                    toast.error("Please choose an image file");
                    return;
                }
                dropzone.files
                    .filter((existingFile) => existingFile !== addedFile)
                    .forEach((existingFile) => dropzone.removeFile(existingFile));
                setFile(addedFile);
            });
            dropzone.on("error", (_file, message) => {
                toast.error(typeof message === "string" ? message : "Image upload is limited to 8 MB");
            });
            dropzoneInstance.current = dropzone;
        });
    }, []);

    useEffect(() => {
        if (!file) {
            setPreviewUrl(design.url);
            return;
        }
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [file, design.url]);

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await updateDesign.mutateAsync({
                id: design.id,
                key: design.key,
                title: title.trim(),
                description: description.trim() || undefined,
                buffer: file ? new Uint8Array(await file.arrayBuffer()) : undefined,
            });
            toast.success("Design updated");
            setFile(null);
            dropzoneInstance.current?.removeAllFiles(true);
            setOpen(false);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Could not update design");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="bg-white text-zinc-950 sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Edit design</DialogTitle>
                    <DialogDescription>Update the title, description, or replace the image.</DialogDescription>
                </DialogHeader>
                <form onSubmit={submit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor={`title-${design.id}`}>Title</Label>
                        <Input id={`title-${design.id}`} value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor={`description-${design.id}`}>Description</Label>
                        <Textarea id={`description-${design.id}`} value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label>Image</Label>
                        <div ref={mountDropzone} className="group relative flex h-44 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-dashed border-zinc-300 bg-zinc-50 text-sm text-zinc-500 transition hover:border-zinc-400">
                            <div className="dz-message flex size-full items-center justify-center">
                                <Image width={0} height={0} src={previewUrl} alt="Design preview" className="h-full w-full object-contain" />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition group-hover:bg-black/40 group-hover:opacity-100">
                                    <span className="rounded-full bg-black/60 px-3 py-1.5 text-xs">Drop or click to replace</span>
                                </div>
                            </div>
                        </div>
                        <p className="truncate text-xs text-zinc-500">{file ? file.name : "Current image"}</p>
                    </div>
                    <Button className="w-full" disabled={!title.trim() || updateDesign.isPending}>
                        {updateDesign.isPending ? "Saving..." : "Save changes"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditDesignModal;
