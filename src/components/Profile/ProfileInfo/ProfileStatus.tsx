import React from "react";
import s from "./ProfileInfo.module.css"


type ProfileStateType = {
    editMode: boolean
}

type ProfileStatePropsType = {
    status: string
}

export class ProfileStatus extends React.Component<ProfileStatePropsType, ProfileStateType> {
    state: ProfileStateType = {
        editMode: false
    }

    activateEditMode = () => {
        this.setState({...this.state, editMode: true});
    }

    deactivateEditMode = () => {
        this.setState({...this.state, editMode: false});
    }

    render() {
        return (
            <div>
                {!this.state.editMode && <div>
                    <span onDoubleClick={this.activateEditMode}>{this.props.status}</span>
                </div>}
                {this.state.editMode && <div>
                    <input autoFocus={true}
                           type="text"
                           value={this.props.status}
                           onBlur={this.deactivateEditMode}
                    />
                </div>}
            </div>
        )
    }
}
