import React, {ChangeEvent} from "react";
import s from "./ProfileInfo.module.css"


type ProfileStateType = {
    editMode: boolean
    status: string
}

type ProfileStatePropsType = {
    status: string
    changeUserStatus: (status: string) => void
}

export class ProfileStatus extends React.Component<ProfileStatePropsType, ProfileStateType> {
    state: ProfileStateType = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({...this.state, editMode: true});
    }

    deactivateEditMode = () => {
        this.setState({...this.state, editMode: false});
        this.props.changeUserStatus(this.state.status)
    }

    onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({...this.state, status: e.currentTarget.value});
    }

    render() {
        console.log(this.props.status)
        return (
            <div>
                {!this.state.editMode && <div>
                    <span onDoubleClick={this.activateEditMode}>{this.props.status || '-------'}</span>
                </div>}
                {this.state.editMode && <div>
                    <input autoFocus={true}
                           type="text"
                           value={this.state.status}
                           onBlur={this.deactivateEditMode}
                           onChange={this.onChangeHandler}
                    />
                </div>}
            </div>
        )
    }
}
