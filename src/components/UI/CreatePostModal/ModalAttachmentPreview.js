import { memo } from 'react';
import './style.css';

const ModalAttachmentPreview = ({ files, removeAttachmentPreview }) => {
    const preview = files.map((file) => {
        return <div key={Math.random()} >
            <div>
                <span><i className="fas fa-file"></i></span>
                <small style={{ marginLeft: '10px' }}>{file.name}</small>
            </div>
            <span onClick={() => removeAttachmentPreview(file.name)}>&times;</span>
        </div>
    });

    return preview;
}

export default memo(ModalAttachmentPreview);
