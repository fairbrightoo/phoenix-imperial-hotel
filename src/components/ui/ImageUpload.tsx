import React, { useState, useRef, useEffect } from 'react';
import { Upload, X, Image as ImageIcon, Link } from 'lucide-react';

interface ImageUploadProps {
    defaultUrl?: string;
    onFileSelect: (file: File | null) => void;
    onUrlChange?: (url: string) => void;
    label?: string;
    className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
    defaultUrl = '',
    onFileSelect,
    onUrlChange,
    label = 'Image',
    className = ''
}) => {
    const [mode, setMode] = useState<'file' | 'url'>('file');
    const [previewUrl, setPreviewUrl] = useState<string>(defaultUrl);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [urlInput, setUrlInput] = useState<string>(defaultUrl);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Update preview when defaultUrl changes (e.g. when editing)
    useEffect(() => {
        if (defaultUrl && !selectedFile) {
            let finalUrl = defaultUrl;
            if (defaultUrl.startsWith('/')) {
                // Prepend backend URL for relative paths
                const hostname = window.location.hostname;
                finalUrl = `http://${hostname}:5000${defaultUrl}`;
            }
            setPreviewUrl(finalUrl);
            setUrlInput(defaultUrl); // Keep original relative path in input
        }
    }, [defaultUrl]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            onFileSelect(file);

            // Create thumbnail preview
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);

            // Clean up memory when component unmounts or file changes
            return () => URL.revokeObjectURL(objectUrl);
        }
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        setUrlInput(url);
        setPreviewUrl(url);
        if (onUrlChange) {
            onUrlChange(url);
        }
        // Clear file selection if switching to URL
        setSelectedFile(null);
        onFileSelect(null);
    };

    const clearSelection = () => {
        setSelectedFile(null);
        setPreviewUrl('');
        setUrlInput('');
        onFileSelect(null);
        if (onUrlChange) onUrlChange('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className={`space-y-3 ${className}`}>
            <div className="flex items-center justify-between">
                <label className="block text-xs uppercase text-zinc-400 font-medium tracking-wider">
                    {label}
                </label>
                <div className="flex bg-zinc-800 rounded p-0.5">
                    <button
                        type="button"
                        onClick={() => setMode('file')}
                        className={`px-2 py-1 text-xs font-medium rounded transition-colors ${mode === 'file' ? 'bg-zinc-600 text-white' : 'text-zinc-400 hover:text-white'
                            }`}
                    >
                        Upload
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode('url')}
                        className={`px-2 py-1 text-xs font-medium rounded transition-colors ${mode === 'url' ? 'bg-zinc-600 text-white' : 'text-zinc-400 hover:text-white'
                            }`}
                    >
                        URL
                    </button>
                </div>
            </div>

            <div className="flex gap-4 items-start">
                {/* Thumbnail Preview */}
                <div className="relative w-24 h-24 bg-zinc-800 rounded-lg border border-zinc-700 flex-shrink-0 overflow-hidden group">
                    {previewUrl ? (
                        <>
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="w-full h-full object-contain bg-zinc-900"
                            />
                            <button
                                type="button"
                                onClick={clearSelection}
                                className="absolute top-1 right-1 bg-black/50 hover:bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all"
                            >
                                <X size={12} />
                            </button>
                        </>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-600">
                            <ImageIcon size={24} />
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="flex-1">
                    {mode === 'file' ? (
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-zinc-700 hover:border-amber-500/50 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors h-24 bg-zinc-800/50"
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <Upload className="text-zinc-400 mb-2" size={20} />
                            <span className="text-xs text-zinc-400">Click to select image</span>
                        </div>
                    ) : (
                        <div className="h-24 flex flex-col justify-center">
                            <div className="relative">
                                <Link className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                                <input
                                    type="url"
                                    value={urlInput}
                                    onChange={handleUrlChange}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full bg-zinc-900 border border-zinc-700 rounded pl-10 pr-4 py-2 text-sm text-white focus:border-amber-500 outline-none"
                                />
                            </div>
                            <p className="text-xs text-zinc-500 mt-2">Enter a direct link to an image</p>
                        </div>
                    )}
                    {/* File Name / URL Display */}
                    {(selectedFile || urlInput) && (
                        <p className="text-xs text-zinc-400 mt-2 truncate max-w-[200px]">
                            {selectedFile ? selectedFile.name : urlInput}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};
