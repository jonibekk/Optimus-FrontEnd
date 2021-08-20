import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    KR_CURRENCY,
    KR_NUMERIC,
    KR_PERSENTAGE,
    KR_TRUE_FALSE
} from '../../../enums/KrUnit';
import {
    TYPE_USD,
    TYPE_JPY,
    TYPE_KRW,
    TYPE_CNY,
    TYPE_EUR
} from '../../../enums/CurrencyType';
import { createAction, getAllGoals } from '../../../store/Actions/GoalAction';
import Avatar from '../Avatar'
import Button from '../Button';
import FormControl from '../FormControl';
import ModalAttachmentPreview from './ModalAttachmentPreview';
import ModalMediaPreview from './ModalMediaPreview';
import './style.css'
import MentionMultiLineInput from '../MentionMultiLine';
import { getAllUsers } from '../../../store/Actions/UserAction';


const KrItem = ({ kr, selected, onclick, onSetKrValue }) => {

    const [KrValue, setKrValue] = useState(kr.current_value);

    const onValueChange = (_, value) => setKrValue(value);

    useEffect(() => {
        if (selected) {
            onSetKrValue(KrValue);
        }
    }, [KrValue, onSetKrValue, selected]);


    let typeIcon = '';
    if (kr.unit === KR_NUMERIC) {
        typeIcon = <i className="fas fa-hashtag"></i>;
    } else if (kr.unit === KR_PERSENTAGE) {
        typeIcon = <i className="fas fa-percentage"></i>;
    } else if (kr.unit === KR_CURRENCY) {
        switch (kr.currency_type) {
            case TYPE_USD.type: typeIcon = <small className='kr-item-currency'>{TYPE_USD.text}</small>; break;
            case TYPE_JPY.type: typeIcon = <small className='kr-item-currency'>{TYPE_JPY.text}</small>; break;
            case TYPE_KRW.type: typeIcon = <small className='kr-item-currency'>{TYPE_KRW.text}</small>; break;
            case TYPE_CNY.type: typeIcon = <small className='kr-item-currency'>{TYPE_CNY.text}</small>; break;
            case TYPE_EUR.type: typeIcon = <small className='kr-item-currency'>{TYPE_EUR.text}</small>; break;
            default: break;
        }
    } else if (kr.unit === KR_TRUE_FALSE) {
        typeIcon = <i className={`fas fa-toggle-on ${KrValue === 0 ? 'toggle-off' : ''}`}></i>;
    }

    return (
        <div className={`create-action-kr-item ${selected && 'selected-kr'}`} onClick={() => onclick(kr)}>
            <div style={{ display: 'flex', alignItems: 'center', columnGap: '15px' }}>
                <span className='kr-item-icon'>{
                    selected ? <ion-icon name="key"></ion-icon> : <ion-icon name="key-outline"></ion-icon>
                }</span>
                <span className='kr-item-name'>{kr.name}</span>
            </div>
            {selected &&
                <div className='kr-item-selected'>
                    <FormControl
                        type='number'
                        name='name'
                        value={KrValue}
                        onchange={onValueChange}
                        error={KrValue < kr.current_value || KrValue > kr.target_value}
                        required />
                    <span className='kr-item-target-value'> /{kr.target_value} {typeIcon}</span>
                </div>
            }
        </div>
    )
}


const CreateAction = ({ onclick, showModal }) => {

    const dispatch = useDispatch();
    const goal = useSelector(state => state.goal);
    const auth = useSelector(state => state.auth);
    const team = useSelector(state => state.team);
    const user = useSelector(state => state.user);

    const [previewImgs, setPreviewImg] = useState([]);
    const [attachments, setAttachments] = useState([]);
    const [selectedGoal, setGoal] = useState(null);
    const [selectedKr, setKr] = useState(null);
    const [body, setBody] = useState({ name: '', mentions: null });
    const [krValue, setKrValue] = useState(0);

    const onBodyChange = (e, newValue, newPlainTextValue, mentions) => {
        setBody({ name: e.target.value, mentions: mentions });
    }

    const onAddMention = (id, display) => {
        console.log('id: ', id, 'display: ', display);
    }

    const onImgFileChoose = (e) => {
        if (previewImgs.length > 0 && e.target.files.length > 0) {
            const exist = previewImgs.filter(file => file.name === e.target.files[0].name);
            if (exist.length === 0) {
                setPreviewImg([...previewImgs, e.target.files[0]]);
            }
        } else if (e.target.files.length > 0) {
            setPreviewImg([...previewImgs, e.target.files[0]]);
        }
    }

    const onAttachFileChoose = (e) => {

        for (let i = 0; i < e.target.files.length; i++) {
            if (attachments.length > 0) {
                const exist = attachments.filter(file => file.name === e.target.files[i].name);
                if (exist.length === 0) {
                    setAttachments([...attachments, e.target.files[i]]);
                }
            } else {
                setAttachments([...attachments, e.target.files[i]]);
            }
        }
    }

    const removeImgPreview = (fileName) => {
        const rest = previewImgs.filter(file => file.name !== fileName);
        setPreviewImg(rest);
    }

    const removeAttachmentPreview = (fileName) => {
        const rest = attachments.filter(file => file.name !== fileName);
        setAttachments(rest);
    }

    const isReadyToCreate = () => {
        return previewImgs.length > 0
            && body.name.length > 0
            && selectedGoal
            && selectedKr;
    }

    const discard = () => {
        setPreviewImg([]);
        setAttachments([]);
        setGoal(null);
        setKr(null);
        setBody({ name: '', mentions: null });
    }

    const onClose = () => {
        if (previewImgs.length > 0 || attachments.length > 0 || body.name.length > 0) {
            if (window.confirm('Content will be discarded, are you sure?')) {
                discard();
                onclick();
            }
        }
        else {
            discard();
            onclick();
        }
    }

    const getGoals = () => {
        let goals = [];
        if (goal.myGoals) {
            goal.myGoals.forEach(gl => {
                goals.push(gl);
            });
        }
        if (goal.subscribedGoals) {
            goal.subscribedGoals.forEach(gl => {
                goals.push(gl);
            });
        }

        return goals;
    }

    const onGoalSelect = (gl) => {
        if (gl !== selectedGoal) {
            setGoal(gl);
            setKr(gl.kr[0]);
        }
    }

    const onKrSelect = (kr) => {
        setKr(kr);
    }

    const prepareData = () => {
        const fd = new FormData();
        fd.append('body', body.name)
        fd.append('kr_current_value', selectedKr.current_value)
        fd.append('kr_added_value', krValue - selectedKr.current_value)
        fd.append('images_length', previewImgs.length);
        fd.append('mentions', body.mentions);
        if (previewImgs.length > 0) {
            previewImgs.forEach((image, _i) => fd.append(`images${_i}`, image));
        }

        return fd;
    }

    const onCreateAction = () => {
        if (isReadyToCreate()) {
            const data = prepareData();
            dispatch(createAction(selectedGoal.id, selectedKr.id, data));
            discard();
            onclick();
        } else {
            alert('You need to upload at least one image, and describe your action to create it.');
        }
    }

    useEffect(() => {
        if (auth.meData && team.currentTeam) {
            dispatch(getAllGoals(team.currentTeam.id, auth.meData.id));
        }
        if (auth.meData && team.currentTeam && !user.users) {
            dispatch(getAllUsers(team.currentTeam.id));
        }
    }, [dispatch, auth, team, user]);

    const dataItems = user.users && user.users.map(user => ({
        id: user.id,
        display: `${user.first_name} ${user.last_name}`
    }));

    return (
        <div className="post-modal" style={{ 'display': showModal ? 'block' : 'none' }}>
            <div className='backdrop' onClick={onClose} />
            <div className="post-modal-content">
                <div className='post-modal-header'>
                    <Avatar width='35px' height='35px' borderRadius='var(--borderRound)' />
                    <span className="model-close" onClick={onClose}>&times;</span>
                </div>
                <div className='post-modal-body'>
                    <MentionMultiLineInput data={dataItems} value={body.name} onChange={onBodyChange} onAdd={onAddMention} />

                    <div className='dropdown select-goal'>
                        <div className="choose-goal-dropdown" id="goals-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            {selectedGoal ? selectedGoal.name : 'Select goal'}
                        </div>
                        <ul className="dropdown-menu" aria-labelledby="goals-dropdown">
                            {getGoals().map(gl => <li key={gl.id} className="dropdown-item" onClick={() => onGoalSelect(gl)} >{gl.name}</li>)}
                        </ul>
                    </div>

                    {selectedGoal &&
                        <div className='select-kr-wrapper'>
                            {selectedGoal.kr.map(kr =>
                                <KrItem
                                    key={kr.id}
                                    kr={kr}
                                    selected={selectedKr.id === kr.id}
                                    krValue={krValue}
                                    onSetKrValue={(value) => setKrValue(value)}
                                    onclick={onKrSelect} />)}
                        </div>
                    }

                    <div className='post-modal-preview-wrapper'>
                        {previewImgs.length > 0 && <ModalMediaPreview files={previewImgs} removeImgPreview={removeImgPreview} />}
                    </div>
                    <div className='post-modal-attachment-wrapper'>
                        {attachments.length > 0 && <ModalAttachmentPreview files={attachments} removeAttachmentPreview={removeAttachmentPreview} />}
                    </div>
                </div>
                <div className='post-modal-footer'>
                    <div className='post-modal-choose-file'>
                        <input type='file' id='choose-file-img' style={{ display: 'none' }} onChange={onImgFileChoose} accept="image/*" />
                        <label className={previewImgs.length === 3 ? 'disable-file-upload' : ''} htmlFor='choose-file-img'><ion-icon name="images-outline"></ion-icon></label>
                        <input type='file' id='choose-file-attachment' style={{ display: 'none' }} onChange={onAttachFileChoose} />
                        <label className={attachments.length === 3 ? 'disable-file-upload' : ''} htmlFor='choose-file-attachment'><ion-icon name="document-attach-outline"></ion-icon></label>
                    </div>
                    <Button onclick={onCreateAction} text='Post' maxWidth='100px' maxHeight='35px' className='btn__primary__rounded' />
                </div>
            </div>
        </div>
    )
}

export default CreateAction
