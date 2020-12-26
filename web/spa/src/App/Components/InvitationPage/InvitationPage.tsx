import { NullableRsvp, Rsvp } from '../../Models/Rsvp.model';
import AuthService from '../../Services/AuthService';
import RsvpService from '../../Services/RsvpService';
import { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps<any> { }

interface State {
    rsvpId?: string;
    isGoing: boolean;
    isStayingAtHotel: boolean;
    havePlusOne: boolean;
    plusOneIsStayingAtHotel: boolean;
    foodAllergies: string;
}

export class InvitationPage extends Component<Props, State> {
    username: string = ''

    state = {
        rsvpId: undefined,
        isGoing: false,
        isStayingAtHotel: false,
        havePlusOne: false,
        plusOneIsStayingAtHotel: false,
        foodAllergies: ''
    }

    async componentDidMount() {
        this.username = this.props.location.pathname.replace('/invite/', '');

        this.checkJwtUser()
        this.checkForExistingRsvp()
    }

    checkJwtUser = () => {
        const usernameFromJwt = AuthService.getLoggedInUsername()

        if (usernameFromJwt) {
            if (usernameFromJwt !== this.username) {
                this.props.history.push(`/${this.username}`)
            }
        } else {
            this.props.history.push(`/${this.username}`)
        }
    }

    checkForExistingRsvp = async () => {
        const rsvp: NullableRsvp = await RsvpService.get(this.username);

        if (rsvp) {
            this.setState({
                rsvpId: rsvp._id,
                isGoing: rsvp.isGoing,
                isStayingAtHotel: rsvp.isStayingAtHotel,
                havePlusOne: rsvp.havePlusOne,
                plusOneIsStayingAtHotel: rsvp.plusOneIsStayingAtHotel,
                foodAllergies: rsvp.foodAllergies
            })
        }
    }

    handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()

        if (this.state.rsvpId !== undefined) {
            const rsvp: Rsvp = {
                _id: this.state.rsvpId,
                name: this.username,
                isGoing: this.state.isGoing,
                isStayingAtHotel: this.state.isStayingAtHotel,
                havePlusOne: this.state.havePlusOne,
                plusOneIsStayingAtHotel: this.state.plusOneIsStayingAtHotel,
                foodAllergies: this.state.foodAllergies
            }
            RsvpService.update(rsvp);
        } else {
            RsvpService.post(
                this.username,
                this.state.isGoing,
                this.state.isStayingAtHotel,
                this.state.havePlusOne,
                this.state.plusOneIsStayingAtHotel,
                this.state.foodAllergies
            )
        }
    }

    handleChange: React.FormEventHandler<HTMLInputElement> = (event) => {
        const { name } = event.currentTarget;
        const value = event.currentTarget.type === "checkbox" ? event.currentTarget.checked : event.currentTarget.value

        this.setState({ ...this.state, [name]: value });
    }

    render() {
        return (
            <div>
                <p>RSVP</p>
                <form onSubmit={this.handleSubmit}>
                    {/* <input type="text" value={this.state.password} onChange={this.handleChange} /> */}
                    <label>
                        Are you going?
                        <input name="isGoing" type="checkbox" checked={this.state.isGoing} onChange={this.handleChange}/>
                    </label>
                    <br />
                    <label>
                        Are you staying at hotel?
                        <input name="isStayingAtHotel" type="checkbox" checked={this.state.isStayingAtHotel} onChange={this.handleChange}/>
                    </label>
                    <br />
                    <label>
                        Are you bringing someone else?
                        <input name="havePlusOne" type="checkbox" checked={this.state.havePlusOne} onChange={this.handleChange}/>
                    </label>
                    <br />
                    <label>
                        Is he/she staying at the hotel?
                        <input name="plusOneIsStayingAtHotel" type="checkbox" checked={this.state.plusOneIsStayingAtHotel} onChange={this.handleChange}/>
                    </label>
                    <br />
                    <label>
                        Any food allergies?
                        <input name="foodAllergies" type="text" value={this.state.foodAllergies} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>)
    }
}