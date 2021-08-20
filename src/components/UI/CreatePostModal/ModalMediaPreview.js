import { memo } from 'react';
import './style.css';

const ModalMediaPreview = ({ files, removeImgPreview }) => {

    const preview = files.map((file) => {
        const url = URL.createObjectURL(file);
        return <div key={Math.random()} >
            <img alt='previews' src={url} />
            <span className='remove-preview-img' onClick={() => removeImgPreview(file.name)}>&times;</span>
        </div>
    });

    return preview;
}

export default memo(ModalMediaPreview);
