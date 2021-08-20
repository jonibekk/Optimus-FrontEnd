import TeamIllustration from '../../assets/create_team.svg';
import './style.css';
import FormControl from '../../components/UI/FormControl';
import Button from '../../components/UI/Button';
import Logo from '../../components/UI/Logo';
import { useEffect, useRef, useState } from 'react';
import Avatar from '../../components/UI/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { getGmtTimezone, validEmail } from '../../components/Util/Utils';
import { CreateNewTeam } from '../../store/Actions/TeamAction'


const distinct = (value, index, self) => {
    return self.indexOf(value) === index;
}

const CreateTeam = (props) => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    let imgUpload = useRef();

    const [invites, setInvites] = useState([]);

    const [data, setData] = useState({
        name: `${auth.meData.first_name}'s team.`,
        image: null,
        invite: '',
        wrongEmail: false,
        submitError: false
    })

    const onImgRefClicked = () => imgUpload.click();
    const onImgFileChoose = (e) => setData({ ...data, image: e.target.files[0] });

    const onInvitesSubmit = (e) => {
        e.preventDefault();
        const emails = data.invite.split(',');

        let validEmailExist = false;
        const validEmails = invites;
        emails.forEach(email => {
            if (email.trim().length > 0 && validEmail(email.trim()) && auth.meData.email !== email.trim()) {
                validEmails.push(email.trim());
                validEmailExist = true;
            }
        });
        if (validEmailExist) {
            setInvites(validEmails.filter(distinct));
        }
        if (data.invite.length > 0 && validEmailExist === false) {
            setData({ ...data, wrongEmail: true, invite: '' });
        } else {
            setData({ ...data, wrongEmail: false, invite: '' });
        }
    }

    const removeInvite = (email) => {
        const rest = invites.filter(em => em !== email);
        setInvites(rest);
    }

    const onSubmit = (e) => {
        if (canSubmit()) {
            const formData = prepareData(data);
            dispatch(CreateNewTeam(formData));
            setData({ ...data, submitError: false });
        } else {
            setData({ ...data, submitError: true });
        }
    }

    const canSubmit = () => {
        return data.name.length > 0;
    }

    const prepareData = (data) => {
        const fd = new FormData();

        fd.append('name', data.name);
        fd.append('timezone', getGmtTimezone())
        if (data.image) { fd.append('image', data.image); }
        if (invites.length > 0) {
            invites.forEach(inv => fd.append('invites[]', inv));
        }

        return fd;
    }

    useEffect(() => { }, [dispatch]);

    return (
        <div className='create-team-container'>
            <div className='create-team-wrapper'>
                <div className='create-team-illustration' >
                    <img src={TeamIllustration} alt='creat-team' />
                </div>
                <div className='create-team-form'>
                    <Logo size='3em' color='var(--contentPrimary)' />
                    <div className='create-team-item'>
                        <span className='create-team-title'>Team Name:</span>
                        <FormControl type='text' name='name'
                            placeholder=''
                            value={data.name}
                            error={!(data.name.length > 0)}
                            onchange={(name, value) => setData({ ...data, [name]: value })}
                            required />
                        {data.submitError && <small style={{ color: 'var(--fgRed)' }}>Name is required!</small>}
                    </div>
                    <div className='create-team-item'>
                        <span className='create-team-title'>How many people in this team?</span>
                        <div className='create-team-upload-wrapper'>
                            <input type='file' id='create-team-logo'
                                style={{ display: 'none' }}
                                ref={ref => imgUpload = ref}
                                onChange={onImgFileChoose} accept="image/*" />
                            {!data.image && <label className='create-team-choose-logo' htmlFor='create-team-logo'>Upload Image</label>}
                            {data.image && <Avatar onclick={onImgRefClicked} width='100px' height='100px' borderRadius='99px' src={URL.createObjectURL(data.image)} />}
                            <span>or</span>
                            <div className='team-default-logo'>{auth.meData.first_name[0].toUpperCase()}</div>
                        </div>
                    </div>
                    <div className='create-team-item'>
                        <span className='create-team-title'>Invite people to this team:</span>
                        <form onSubmit={onInvitesSubmit}>
                            <FormControl type='text' name='invite'
                                placeholder=''
                                value={data.invite}
                                onchange={(name, value) => setData({ ...data, [name]: value })} />
                            {data.wrongEmail && <small style={{ color: 'var(--fgRed)' }}>Oops, invalid email triggered!</small>}
                        </form>
                        <ul className='invited-emails-list-wrapper'>
                            {
                                invites.map((email, index) => <li key={email}>
                                    {index + 1}.&nbsp;&nbsp;{email}&nbsp;
                                    <span className='remove-inted-email' onClick={() => removeInvite(email)}>&times;</span>
                                </li>)
                            }
                        </ul>
                    </div>
                    <div className='create-team-item'>
                        <span className='create-team-title'>You're all done! Good luck, have fun.✌️</span>
                        <Button
                            maxWidth='200px'
                            text='Create Team'
                            className={data.submitError ? 'btn__primary shakyButton' : 'btn__primary'}
                            onclick={onSubmit} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default (CreateTeam);