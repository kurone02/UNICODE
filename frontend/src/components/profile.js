import { Button, Card } from "react-bootstrap";
import useToken from "../useTokens";


export default function Profile() {
    const {token, setToken} = useToken();
    return (
        <Card style={{ width: '15rem', margin: '10px' }}>
            <Card.Header>Profile</Card.Header>
            <Card.Body>
            {   (token)?
                    <>
                        <Card.Text>
                            Username: {token.username}
                        </Card.Text>
                        <Card.Text>
                            Solved problems: N/A
                        </Card.Text>
                        <Card.Text>
                            Coins obtained: {token.coins}
                        </Card.Text>
                    </>
                :
                    "You are not signed in!"
            }
            </Card.Body>
        </Card>
    )
}