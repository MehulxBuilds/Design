"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { useCreateDesign } from "@/hooks/use-design";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Dropzone from "dropzone";
import Image from "next/image";

const CreateDesignModal = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const dropzoneElement = useRef<HTMLDivElement>(null);
    const dropzoneInstance = useRef<Dropzone | null>(null);
    const initializationFrame = useRef<number | null>(null);
    const createDesign = useCreateDesign();

    const mountDropzone = useCallback((node: HTMLDivElement | null) => {
        if (initializationFrame.current !== null) {
            cancelAnimationFrame(initializationFrame.current);
            initializationFrame.current = null;
        }
        if (dropzoneInstance.current) {
            dropzoneInstance.current.destroy();
            dropzoneInstance.current = null;
        }

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
                maxFilesize: 8,
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
            setPreviewUrl(null);
            return;
        }
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!file || !title.trim()) return;
        try {
            await createDesign.mutateAsync({
                title: title.trim(),
                description: description.trim() || undefined,
                image: new Uint8Array(await file.arrayBuffer()),
            });
            toast.success("Design published");
            setTitle("");
            setDescription("");
            setFile(null);
            dropzoneInstance.current?.removeAllFiles(true);
            setOpen(false);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Could not publish design");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="bg-white text-zinc-950 sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Quick publish</DialogTitle>
                    <DialogDescription>Upload an image and add its details.</DialogDescription>
                </DialogHeader>
                <form onSubmit={submit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="design-title">Title</Label>
                        <Input id="design-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Campaign design" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="design-description">Description</Label>
                        <Textarea id="design-description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Optional description" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="design-file">Image</Label>
                        <div
                            ref={mountDropzone}
                            className="group relative flex h-44 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-zinc-300 bg-zinc-50 text-sm text-zinc-500 transition hover:border-zinc-400 hover:bg-zinc-100"
                        >
                            <div className="dz-message flex size-full flex-col items-center justify-center">
                                {previewUrl ? (
                                    <>
                                    <Image width={0} height={0} src={previewUrl} alt="Selected image preview" className="h-full w-full object-contain" />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition group-hover:bg-black/40 group-hover:opacity-100">
                                        <span className="rounded-full bg-black/60 px-3 py-1.5 text-xs">Drop or click to replace</span>
                                    </div>
                                    </>
                                ) : (
                                    <>
                                        <Upload className="mb-2 size-5" />
                                        <span>Drop an image here or click to choose</span>
                                    </>
                                )}
                            </div>
                        </div>
                        {file && <p className="truncate text-xs text-zinc-500">{file.name}</p>}
                    </div>
                    <Button type="submit" className="w-full" disabled={!file || !title.trim() || createDesign.isPending}>
                        {createDesign.isPending ? "Publishing..." : "Publish design"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateDesignModal;
