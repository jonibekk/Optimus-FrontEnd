import { useState } from 'react';
import Button from '../Button';
import FormControl from '../FormControl'
import Logo from '../Logo'
import './style.css'


const CreateGoal = ({ showModal, onclick, onCreateGoal }) => {

    const [data, setData] = useState({ name: '', description: '', color: '#7543C1', dueDate: null });

    const onValueChange = (name, value) => setData({ ...data, [name]: value });

    const onCreate = () => {
        if (data.name.length > 0) {
            const fd = new FormData();
            fd.append('name', data.name);
            fd.append('color', data.color);
            if (data.description.length > 0) {
                fd.append('description', data.description);
            }
            if (data.dueDate) {
                fd.append('due_date', data.dueDate);
            }

            onCreateGoal(fd);
            setData({ name: '', description: '', color: '#7543C1', dueDate: null });
        }
    }

    return (
        <div className='create-goal-container' style={{ 'display': showModal ? 'block' : 'none' }}>
            <div className='backdrop' onClick={onclick} />
            <div className='create-goal-wrapper'>
                <div className='create-goal-header'>
                    <Logo color='var(--contentPrimary)' size='30px' />
                    <span className='model-close' onClick={onclick}>&times;</span>
                </div>
                <div className='create-goal-content'>
                    <div className='create-goal-item'>
                        <label htmlFor='name'>Goal name:</label>
                        <small>What do you want to do? Goals are high-level containers that can be broken down into smaller Key Results.</small>
                        <FormControl type='text' name='name' value={data.name} onchange={onValueChange} required />
                    </div>
                    <div className='create-goal-item'>
                        <label htmlFor='name'>Goal description:</label>
                        <small>This is optional. A short explanation why this Goal is set and how it should be achieved.</small>
                        <FormControl type='text' name='description' value={data.description} onchange={onValueChange} />
                    </div>
                    <div className='create-goal-item'>
                        <label>Choose color:</label>
                        <small>This color will decorate your goals's data and components.</small>
                        <div className='create-goal-colors'> {
                            colorList.map(color =>
                                <div key={Math.random()}
                                    className='create-goal-color'
                                    style={{ background: `${color}d0` }}
                                    onClick={() => onValueChange('color', color)} />
                            )
                        } </div>
                        <div className='create-goal-color-preview' style={{ background: `${data.color}e0` }} >Preview</div>
                    </div>
                    <div className='create-goal-item'>
                        <label>Set due-date:</label>
                        <small>Due-date is the date where you stop making actions and see how far you go to achieve your goal.</small>
                        <div className='create-goal-due-data'>
                            <Button className='btn__primary' maxHeight='40px' />
                        </div>
                    </div>
                    <Button className='btn__primary' maxHeight='45px' text='Create a goal' onclick={onCreate} />
                </div>
            </div>
        </div>
    )
}

const colorList = ['#7543C1', '#f94144', '#ff6f00', '#1ed760', '#5B7083', '#000000'];

export default CreateGoal;
