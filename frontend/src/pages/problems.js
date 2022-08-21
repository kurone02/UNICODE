import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useParams } from "react-router-dom";
import { Col, ListGroup, ListGroupItem, Row, Form } from 'react-bootstrap';
import NavBar from '../components/navbar';
import Profile from '../components/profile';
import ProblemList from '../components/problem_list';
import Ranking from '../components/ranking';
import useToken from '../useTokens';
import { useState } from 'react';

function ViewProblemList() {
    return (
        <>
            <NavBar/>

            <br/>

            <Container>
                <Row>
                    <Col sm={9}>
                        <center>
                            <h1>Problems</h1>
                        </center>
                        <ProblemList code="000" title="SECRET OF THE UNIVERSE" statement="our program is to use the brute-force approach in order to find the Answer to Life, the Universe, and Everything. More precisely... rewrite small numbers from input to output. Stop proce..."/>
                        <ProblemList code="001" title="THE MOST BASIC OPERATION" statement="Given two integer numbers. Your task is to find their sum."/>
                        <ProblemList code="002" title="THE SECOND MOST BASIC OPERATION" statement="Given two integer numbers. Your task is to find their absolute difference."/>
                        <ProblemList code="003" title="MULTIPLY!!!" statement="Given two integer numbers. Your task is to find their product."/>
                        <ProblemList code="004" title="DIVIDE BUT NOT CONQUER" statement="Given two integer numbers. Your task is to find the ratio between the two numbers."/>
                        <ProblemList code="005" title="A VERY HARD PROBLEM" statement="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore..."/>
                    </Col>

                    <Col sm={3}>
                        <Profile/>
                        <Ranking/>
                    </Col>
                </Row>
                
            </Container>
        </>
    );
}

function Submit({pcode}) {
    const {token, setToken} = useToken();
    const [code, setCode] = useState();
    const [test, setTest] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(code);
        console.log(test);
        var data = new FormData()
        data.append('files', code, code.name);
        data.append('files', test, test.name);
        const res = await fetch(`http://localhost:2022/check/${pcode}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: data
            })
        });
        console.log(res);
    }

    return (
        <Card style={{ width: '15rem', margin: '10px' }}>
            <Card.Header>Submission</Card.Header>
            <Card.Body>
                {
                    (token)?
                        <Form encType="multipart/form-data" onSubmit={handleSubmit}>
                            <Form.Group onChange={e => {setCode(e.target.files[0]);}} controlId="formFile" className="mb-3">
                                <Form.Label>Upload your source code:</Form.Label>
                                <Form.Control type="file"/>
                            </Form.Group>
                            <Form.Group onChange={e => {setTest(e.target.files[0]);}} controlId="formFile" className="mb-3">
                                <Form.Label>Upload your test answer:</Form.Label>
                                <Form.Control type="file" />                                
                            </Form.Group>
                            <center>
                                <Button variant="primary" type="submit">Submit</Button>
                            </center>
                        </Form>
                    :
                        "You are not signed in."
                }
            </Card.Body>
        </Card>
    )
}

function ViewProblem(pcode) {


    function ProblemDetails() {

        async function DownloadTest() {
            const blob = await (await fetch(`http://localhost:2022/test/${pcode}`)).blob();
            const url = window.URL.createObjectURL(
                new Blob([blob]),
            );
            const link = document.createElement('a');
            link.href = url;
            link.download = `${pcode}.txt`;
            link.click();
        }
    
        return (
            <Card style={{ width: '15rem', margin: '10px' }}>
                <Card.Header>Problem details</Card.Header>
                <Card.Body>
                    <ListGroup>
                        <ListGroupItem>
                            Coins remaining: 3 
                        </ListGroupItem>
                        <ListGroupItem>
                            # solved: 4
                        </ListGroupItem>
                        <ListGroupItem>
                            <center>
                                <Button onClick={DownloadTest} variant="primary">Download test</Button>
                            </center>
                        </ListGroupItem>
                    </ListGroup>                
                </Card.Body>
            </Card>
        )
    }


    return (
        <>
            <NavBar/>
            <Container>
                <Row>
                    <Col sm={9}>
                        <center>
                            
                        </center>
                        <Card style={{ width: '100%', margin: '10px'}}>
                            <Card.Header><h4>Problem {pcode} - SECRET OF THE UNIVERSE</h4></Card.Header>
                            <Card.Body>
                                <ListGroup>
                                    <ListGroupItem>
                                        <center>
                                            <h5>Statement</h5>
                                        </center>
                                        Your program is to use the brute-force approach in order to find the Answer to Life, the Universe, and Everything. More precisely... rewrite small numbers from input to output. Stop processing input after reading in the number 42. All numbers at input are integers of one or two digits.
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <center>
                                            <h5>Input</h5>
                                        </center>
                                        The first line consists of one positive integer T - the number of test cases. <br/>
                                        The next lines consists of T groups of lines, each consists of an abitary number of integers. <br/>
                                        A new test case started when the line has the string `END`. <br/>
                                        The input garentee that the total number of integers is less than 100000.
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <center>
                                            <h5>Output</h5>
                                        </center>
                                        The answer to the T test cases above.
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <center>
                                            <h5>Example</h5>
                                        </center>
                                            <b>Input:</b> <br/>
                                                3<br/>
                                                2<br/>
                                                88<br/>
                                                42<br/>
                                                99<br/>
                                                END<br/>
                                                2<br/>
                                                423<br/>
                                                3<br/>
                                                -879<br/>
                                                42<br/>
                                                END<br/>
                                                12<br/>
                                                12<br/>
                                                12<br/>
                                                12<br/>
                                                END<br/>
                                                42<br/>
                                                99<br/>
                                                42<br/>
                                                END<br/>
                                            <b>Output:</b> <br/>
                                                1<br/>
                                                2<br/>
                                                88<br/>

                                                2<br/>
                                                423<br/>
                                                3<br/>
                                                -879<br/>

                                                12<br/>
                                                12<br/>
                                                12<br/>
                                                12<br/>
                                    </ListGroupItem>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col sm={3}>
                        <ProblemDetails/>
                        <Submit pcode={pcode}/>
                        <Profile/>
                        <Ranking/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

function Problems() {
    let { pcode } = useParams();
    
    if(pcode) return ViewProblem(pcode);
    
    return ViewProblemList();
    
}

export default Problems;