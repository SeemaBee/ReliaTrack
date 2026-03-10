import { Alert } from 'react-native';
import {
    launchCamera,
    launchImageLibrary,
    CameraOptions,
    ImageLibraryOptions,
    Asset
} from 'react-native-image-picker';
import { ImageFile } from 'utils/constant';

const handleImageResponse = (result: any, onSelect: (file: ImageFile) => void, onCancel: () => void) => {
    if (result.didCancel) {
        onCancel();
        return;
    }

    if (result.errorCode) {
        Alert.alert(
            'Access Denied',
            result.errorMessage || 'Unable to access media. Please check permissions.',
            [{ text: 'OK' }]
        );
        onCancel();
        return;
    }

    if (result.assets && result.assets.length > 0) {
        const asset: Asset = result.assets[0];
        if (asset.uri) {
            const fileData: ImageFile = {
                uri: asset.uri,
                name: asset.fileName ?? 'photo.jpg',
                type: asset.type ?? 'image/jpeg',
            };
            onSelect(fileData);
        }
    }
};

export const handleOpenCamera = async (onSelect: (file: ImageFile) => void, onCancel: () => void) => {
    const options: CameraOptions = {
        mediaType: 'photo',
        saveToPhotos: true,
        quality: 0.8,
    };

    try {
        const result = await launchCamera(options);
        handleImageResponse(result, onSelect, onCancel);
    } catch (error) {
        console.log(error);
        Alert.alert('Error', 'Failed to open camera.');
        onCancel();
    }
};

export const handleOpenGallery = async (onSelect: (file: ImageFile) => void, onCancel: () => void) => {
    const options: ImageLibraryOptions = {
        mediaType: 'photo',
        selectionLimit: 1,
        quality: 0.8,
    };

    try {
        const result = await launchImageLibrary(options);
        handleImageResponse(result, onSelect, onCancel);
    } catch (error) {
        console.log(error);
        Alert.alert('Error', 'Failed to open gallery.');
        onCancel();
    }
};