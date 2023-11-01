/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react';

const ImageGallery = () => {
    const [images, setImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);

    // // const photos = [

    // ];
    // const handleStoredImage = () => {
    //     const obj = {
    //         id: 1,
    //         file: "images/image-1.webp"
    //         }
    //         setImages(obj);
    //     }
    // handleStoredImage();
    const handleImageUpload = (event) => {
        const newImages = Array.from(event.target.files).map((file) => ({
            id: Math.random(),
            file,
        }));

        setImages([...images, ...newImages]);
        
    };

    
    const handleImageSelect = (imageId) => {
        if (selectedImages.includes(imageId)) {
            setSelectedImages(selectedImages.filter((id) => id !== imageId));
        } else {
            setSelectedImages([...selectedImages, imageId]);
        }
    };

    
    const handleDeleteSelectedImages = () => {
        const remainingImages = images.filter((image) => !selectedImages.includes(image.id));
        setImages(remainingImages);
        setSelectedImages([]); 
    };
    
    

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Image Gallery</h1>
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="mb-4"
            />
            {selectedImages.length > 0 && (
                <div className="flex items-center justify-between mb-4">
                    <div>
                        {selectedImages.length} image{selectedImages.length === 1 ? '' : 's'} selected
                    </div>
                    <button
                        onClick={handleDeleteSelectedImages}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                        Delete Selected
                    </button>
                </div>
            )}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-5 checked:brightness-75">
                {images.map((image, index) => (
                    <div key={image.id} className="relative group hover:brightness-50">
                        <img
                            src={URL.createObjectURL(image.file)}
                            alt={`Image ${index}`}
                            className="w-full h-auto rounded-lg "
                        />
                        
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ease-in">
                            <input
                                type="checkbox"
                                checked={selectedImages.includes(image.id)}
                                onChange={() => handleImageSelect(image.id)}
                                className="absolute top-2 left-2"
                            />
                        </div>

                    </div>
                ))}

            </div>
        </div>
    );
};

export default ImageGallery;
