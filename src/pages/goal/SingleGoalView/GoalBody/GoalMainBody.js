import { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import CreateKeyResult from '../../../../components/UI/CreateKeyResult';
import CreateAction from '../../../../components/UI/CreatePostModal/CreateAction';
import GoalMainActions from './GoalMainActions';
import GoalMainKeyResults from './GoalMainKeyResults';
import { createKr, getCurrentGoalWithData } from '../../../../store/Actions/GoalAction';
import './style.css'
import { useParams } from 'react-router';

const GoalMainBody = ({ goal }) => {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const params = useParams();

    const [toggleTab, setToggleTab] = useState({ keyResult: true, actions: false });
    const [toggleModal, setToggleModal] = useState({ keyResult: false, action: false });

    const toggleStyle = {
        color: 'var(--fgWhite)',
        background: goal.color
    };

    const onToggle = (name) => {
        if (name === 'keyResult' && !toggleTab.keyResult) {
            setToggleTab({ keyResult: true, actions: false });
        } else if (name === 'actions' && !toggleTab.actions) {
            setToggleTab({ keyResult: false, actions: true });
        }
    }

    const onToggleKr = () => setToggleModal({ ...toggleModal, keyResult: !toggleModal.keyResult });
    const onToggleAction = () => setToggleModal({ ...toggleModal, action: !toggleModal.action });

    const onCreateKr = async (data) => {
        await dispatch(createKr(goal.id, data));
        await dispatch(getCurrentGoalWithData(params.goalId));
    }

    useEffect(() => { }, [dispatch]);

    let isMmber = false;
    for (let index = 0; index < goal.member.length; index++) {
        if (goal.member[index].id === auth.meData.id) {
            isMmber = true;
            break;
        }
    }

    return (
        <div className='goal-body-wrapper' >
            <div className='goal-body-tabs'>
                <div className='tab-item' style={toggleTab.keyResult ? toggleStyle : {}} onClick={() => onToggle('keyResult')}>
                    Key-Results
                    {(toggleTab.keyResult && isMmber) && <span className='tab-item-add' style={{ color: goal.color }} onClick={onToggleKr}>+Add</span>}
                </div>
                <div className='tab-item' style={toggleTab.actions ? toggleStyle : {}} onClick={() => onToggle('actions')}>Actions</div>
            </div>
            {toggleTab.keyResult && <GoalMainKeyResults krs={goal.kr} color={goal.color} />}
            {toggleTab.actions && <GoalMainActions actions={goal.action} color={goal.color} />}
            <CreateAction onclick={onToggleAction} showModal={toggleModal.action} />
            <CreateKeyResult onclick={onToggleKr} showModal={toggleModal.keyResult} goalId={goal.id} onCreateKr={onCreateKr} />
        </div>
    )
}

export default connect(null, [])(GoalMainBody)
