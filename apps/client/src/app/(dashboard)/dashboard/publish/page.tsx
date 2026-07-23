"use client";

import { Eye, ImageIcon, KeyRound, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useAccessKeys, useCreateAccessKey, useDeleteAccessKey } from "@/hooks/use-key";
import { useDeleteDesign, useDesigns } from "@/hooks/use-design";
import { Button } from "@/components/ui/button";
import CreateDesignModal from "@/components/modules/dashboard/create-design-modal";
import EditDesignModal from "@/components/modules/dashboard/edit-design-modal";
import ViewDesignModal from "@/components/modules/dashboard/view-design-modal";
import ViewKeyModal from "@/components/modules/dashboard/view-key-modal";
import { useAuthStore } from "@/store/key-store";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from "next/image";

const maskedKey = (key: string) => `${key.slice(0, 6)}••••••••${key.slice(-4)}`;

export default function PublishPage() {
    const currentKey = useAuthStore();
    const keys = useAccessKeys();
    const designs = useDesigns();
    const createKey = useCreateAccessKey();
    const deleteKey = useDeleteAccessKey();
    const deleteDesign = useDeleteDesign();

    console.log(designs.data?.design)

    const removeKey = async (id: string) => {
        try {
            await deleteKey.mutateAsync({ id });
            toast.success("Access key deleted");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Could not delete key");
        }
    };

    const removeDesign = async (id: string) => {
        try {
            await deleteDesign.mutateAsync({ id });
            toast.success("Design deleted");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Could not delete design");
        }
    };

    const addKey = async () => {
        try {
            await createKey.mutateAsync();
            toast.success("Access key generated");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Could not generate key");
        }
    };

    return (
        <div className="min-h-[calc(100svh-8rem)] bg-white text-zinc-950">
            <div className="mb-6">
                <p className="text-sm text-zinc-500">Manage publishing access and uploaded designs.</p>
            </div>

            <div className="grid min-h-165 grid-cols-1 gap-5 xl:grid-cols-[minmax(320px,0.82fr)_minmax(0,1.35fr)]">
                <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold">Keys</h2>
                            <p className="text-sm text-zinc-500">{keys.data?.keys.length ?? 0} access keys</p>
                        </div>
                        <Button size="sm" onClick={addKey} disabled={createKey.isPending}>
                            {createKey.isPending ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
                            New key
                        </Button>
                    </div>

                    {keys.isLoading ? (
                        <div className="flex h-48 items-center justify-center"><Loader2 className="size-5 animate-spin text-zinc-400" /></div>
                    ) : keys.isError ? (
                        <p className="rounded-xl bg-red-50 p-4 text-sm text-red-600">{keys.error.message}</p>
                    ) : keys.data?.keys.length ? (
                        <div className="space-y-2">
                            {keys.data.keys.map((accessKey) => (
                                <div key={accessKey.id} className="group flex cursor-pointer items-center gap-3 rounded-xl border border-zinc-200 px-3 py-3 transition hover:border-zinc-300 hover:bg-zinc-50">
                                    <span className="flex size-8 items-center justify-center rounded-lg bg-zinc-100">
                                        <KeyRound className="size-4 text-zinc-600" />
                                    </span>
                                    <code className="min-w-0 flex-1 truncate text-sm font-medium">{maskedKey(accessKey.key)}</code>
                                    {currentKey?.token === accessKey.key && (
                                        <span className="relative flex items-center justify-center size-3">
                                            <span className="absolute inline-flex size-full rounded-full bg-green-400 opacity-75 animate-ping" />
                                            <span className="relative inline-flex size-1.5 rounded-full bg-green-500" />
                                        </span>
                                    )}
                                    {accessKey.block && <span className="rounded-full bg-red-50 px-2 py-1 text-[11px] font-medium text-red-600">Blocked</span>}
                                    <ViewKeyModal accessKey={accessKey}>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="size-8 text-zinc-400 hover:bg-blue-50 hover:text-blue-600"
                                            aria-label="Delete access key"
                                            onClick={(event) => event.stopPropagation()}
                                        >
                                            <Eye className="size-4" />
                                        </Button>
                                    </ViewKeyModal>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="size-8 text-zinc-400 hover:bg-red-50 hover:text-red-600"
                                                aria-label="Delete access key"
                                                onClick={(event) => event.stopPropagation()}
                                            >
                                                <Trash2 className="size-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="bg-white text-zinc-950">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Delete this access key?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. The key will permanently lose access.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() => void removeKey(accessKey.id)}
                                                    disabled={deleteKey.isPending}
                                                    className="bg-red-600 text-white hover:bg-red-700"
                                                >
                                                    {deleteKey.isPending ? "Deleting..." : "Delete key"}
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>

                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex h-48 flex-col items-center justify-center rounded-xl border border-dashed text-center">
                            <KeyRound className="mb-3 size-6 text-zinc-400" />
                            <p className="text-sm font-medium">No access keys</p>
                            <p className="text-xs text-zinc-500">Generate one to get started.</p>
                        </div>
                    )}
                </section>

                <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold">Designs</h2>
                            <p className="text-sm text-zinc-500">{designs.data?.design.length ?? 0} published images</p>
                        </div>
                        <CreateDesignModal>
                            <Button size="sm">
                                <Plus className="size-4" />
                                Publish
                            </Button>
                        </CreateDesignModal>
                    </div>

                    {designs.isLoading ? (
                        <div className="flex h-64 items-center justify-center"><Loader2 className="size-5 animate-spin text-zinc-400" /></div>
                    ) : designs.isError ? (
                        <p className="rounded-xl bg-red-50 p-4 text-sm text-red-600">{designs.error.message}</p>
                    ) : designs.data?.design.length ? (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {designs.data.design.map((design) => (
                                <div key={design.id} className="group relative aspect-square overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100">
                                    <ViewDesignModal design={design}>
                                        <button type="button" className="absolute inset-0 cursor-zoom-in text-left" aria-label={`View ${design.title}`}>
                                            <Image
                                                src={design.url}
                                                alt={design.title}
                                                fill
                                                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                                                quality={72}
                                                loading="lazy"
                                                fetchPriority="low"
                                                className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                                            />
                                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-4 pb-3 pt-8 text-white">
                                                <p className="truncate text-sm font-medium">{design.title}</p>
                                            </div>
                                        </button>
                                    </ViewDesignModal>
                                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2 bg-black/0 opacity-0 transition group-hover:bg-black/35 group-hover:opacity-100">
                                        <EditDesignModal design={design}>
                                            <button type="button" className="pointer-events-auto rounded-full bg-white p-2.5 text-zinc-800 shadow hover:bg-zinc-100" aria-label="Edit design">
                                                <Pencil className="size-4" />
                                            </button>
                                        </EditDesignModal>

                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button
                                                    type="button"
                                                    onClick={(event) => event.stopPropagation()} className="pointer-events-auto rounded-full bg-white size-9 text-red-600 shadow hover:bg-red-50" aria-label="Delete design">
                                                    <Trash2 className="size-4" />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent className="bg-white text-zinc-950">
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Delete this Design?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. The Design will permanently lose access.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() => void removeDesign(design.id)}
                                                        disabled={deleteDesign.isPending}
                                                        className="bg-red-600 text-white hover:bg-red-700"
                                                    >
                                                        {deleteDesign.isPending ? "Deleting..." : "Delete Design"}
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>

                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <CreateDesignModal>
                            <button type="button" className="flex min-h-40 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 text-center hover:bg-zinc-50">
                                <ImageIcon className="mb-3 size-7 text-zinc-400" />
                                <p className="text-sm font-medium">No designs yet</p>
                                <p className="text-xs text-zinc-500">Click to publish your first image.</p>
                            </button>
                        </CreateDesignModal>
                    )}
                </section>
            </div>
        </div>
    );
}
