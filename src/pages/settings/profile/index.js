import { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import Avatar from '../../../components/UI/Avatar'
import Button from '../../../components/UI/Button'
import FormControl from '../../../components/UI/FormControl'
import { updateMeProfile } from '../../../store/Actions/UserAction'
import './style.css'

const Profile = () => {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [data, setData] = useState({
        imageUrl: auth.meData.avatar_url,
        firstname: auth.meData.first_name,
        lastname: auth.meData.last_name,
        bio: auth.meData.bio === null ? '' : auth.meData.bio
    });
    const [image, setImage] = useState(null);

    const onImgFileChoose = (e) => setImage(e.target.files[0]);
    const onChangeData = (name, value) => setData({ ...data, [name]: value });

    const valueChanged = () => {
        const checkFName = (data.firstname.trim().length > 0 && data.firstname.trim() !== auth.meData.first_name.trim());
        const checkLName = (data.lastname.trim().length > 0 && data.lastname.trim() !== auth.meData.last_name.trim());
        const checkBio = (data.bio.trim().length > 0 && auth.meData.bio && data.bio.trim() !== auth.meData.bio.trim());

        return checkFName || checkLName || checkBio;
    }
    const newImageUploaded = () => { return image !== null; }

    const onUpdateUser = () => {
        if (valueChanged() || newImageUploaded()) {
            const fd = new FormData();
            fd.append('first_name', data.firstname.trim());
            fd.append('last_name', data.lastname.trim());
            fd.append('bio', data.bio.trim());
            if (image) {
                fd.append('avatar', image);
            }

            dispatch(updateMeProfile(auth.meData.id, fd));
        }
    }

    useEffect(() => {

    }, [dispatch, auth.meData]);

    return (
        <div className='sett-profile-wrapper'>
            <h2>Profile</h2>
            <div className='sett-profile-item' style={{ display: 'flex', flexDirection: 'column' }}>
                <span className='sett-profile-item-title'>Avatar</span>
                <div className='sett-profile-item-avatar'>
                    <input type='file' id='create-user-avatar'
                        style={{ display: 'none' }}
                        onChange={onImgFileChoose} accept="image/*" />
                    <Avatar
                        width='82px'
                        height='82px'
                        borderRadius='99px'
                        src={newImageUploaded() ? URL.createObjectURL(image) : data.imageUrl} />
                    <label className='btn btn__white' htmlFor='create-user-avatar'>Change avatar</label>
                </div>
            </div>
            <div className='sett-profile-item' style={{ paddingTop: '20px' }}>
                <span className='sett-profile-item-title'>Full Name</span>
                <div className='sett-profile-item-fulname'>
                    <FormControl type='text' placeholder='First name' name='firstname' value={data.firstname} onchange={onChangeData} />
                    <FormControl type='text' placeholder='Last name' name='lastname' value={data.lastname} onchange={onChangeData} />
                </div>
            </div>
            <div className='sett-profile-item' style={{ paddingTop: '20px' }}>
                <span className='sett-profile-item-title'>Bio</span>
                <div style={{ paddingTop: '5px' }}>
                    <textarea
                        rows='4'
                        className='sett-profile-item-bio-textarea'
                        name='bio'
                        value={data.bio}
                        onChange={(e) => onChangeData('bio', e.target.value)} />
                </div>
            </div>
            <div className='sett-profile-item-btn-save'>
                <Button
                    text='Save changes'
                    maxWidth='150px'
                    maxHeight='40px'
                    onclick={onUpdateUser}
                    className={valueChanged() || newImageUploaded() ? 'btn__primary' : 'btn__disabled'} />
            </div>
        </div>
    )
}

export default connect(null, [])(Profile)
