import './Invitation.scss';
import OurNavbar from '../../Components/OurNavbar/OurNavbar';
import { NullableRsvp, Rsvp } from '../../Models/Rsvp.model';
import RsvpService from '../../Services/RsvpService';
import { checkJwtUser } from '../../Utils/Auth';
import React, { Component, Fragment } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Container } from 'reactstrap';

interface Props extends RouteComponentProps<any> { }

interface State {
    rsvpId?: string;
    username: string;
    isGoing: boolean;
    isStayingAtHotel: boolean;
    havePlusOne: boolean;
    plusOneIsStayingAtHotel: boolean;
    foodAllergies: string;
}

class Invitation extends Component<Props, State> {

    state = {
        rsvpId: undefined,
        username: '',
        isGoing: false,
        isStayingAtHotel: false,
        havePlusOne: false,
        plusOneIsStayingAtHotel: false,
        foodAllergies: ''
    }

    componentDidMount() {
        const usernameFromUrl = this.props.location.pathname.replace('/', '');
		checkJwtUser(usernameFromUrl, () => this.props.history.push(`/verify/${usernameFromUrl}`))
        this.setState({ username: usernameFromUrl }, () => this.shouldCheckForRsvp())
    }

    async componentDidUpdate() {
        this.shouldCheckForRsvp()
    }

    shouldCheckForRsvp = () => {
        if (this.state.username !== '' && this.state.rsvpId === undefined) {
            this.checkForExistingRsvp()
        }
    }

    checkForExistingRsvp = async () => {
        const rsvp: NullableRsvp = await RsvpService.get(this.state.username);

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
                name: this.state.username,
                isGoing: this.state.isGoing,
                isStayingAtHotel: this.state.isStayingAtHotel,
                havePlusOne: this.state.havePlusOne,
                plusOneIsStayingAtHotel: this.state.plusOneIsStayingAtHotel,
                foodAllergies: this.state.foodAllergies
            }
            RsvpService.update(rsvp);
        } else {
            RsvpService.post(
                this.state.username,
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

    renderForm(): JSX.Element {
        return (
            <div>
                <p>RSVP</p>
                <form onSubmit={this.handleSubmit}>
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

    render() {
        return (
            <Fragment>
                <div className="invitation-image">
                    <OurNavbar />
                    <Container>
                        <h1>Testing</h1>
                    </Container>
                </div>
                {this.renderForm()}
            </Fragment>
        )
    }
}

export default Invitation;