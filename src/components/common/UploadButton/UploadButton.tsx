import React, {useEffect, useState} from 'react';
import {Upload, Button} from 'antd';
import {UploadOutlined} from '@ant-design/icons';

type PropsType = {
    onProfilePhotoSelected: (file: File) => Promise<string>
}

export const UploadButton: React.FC<PropsType> = ({onProfilePhotoSelected}) => {
    const [file, setFile] = useState<File | null>(null);
    const [isUploaded, setIsUploaded] = useState<boolean>(false);

    const handleUpload = async (file: File) => {
        const res = await onProfilePhotoSelected(file);
        setIsUploaded(true);
    };

    useEffect(() => {
       const butTimeOut = setTimeout(() => {
            setIsUploaded(false);
        }, 2000);
       return () => {
           clearTimeout(butTimeOut);
       }
    }, [isUploaded])

    return (
        <div>
            {!isUploaded && (
                <Upload
                    accept=".jpeg,.jpg,.png"
                    maxCount={1}
                    beforeUpload={(file: File) => {
                        setFile(file);
                        handleUpload(file);
                        return false;
                    }}
                >
                    <Button icon={<UploadOutlined/>}>Click to Upload</Button>
                </Upload>
            )}
            {isUploaded && <div>{file?.name} was successfully uploaded!</div>}
        </div>
    );
};


