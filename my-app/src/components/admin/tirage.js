import React, { useEffect, useState } from "react";
import { Button, Input } from "reactstrap";
import { useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { toast } from "react-toastify";
const Tirage = () => {
    const [pickedPlayer1, setPickedPlayer1] = useState();
    const [pickedPlayer2, setPickedPlayer2] = useState();
    const [players, setPlayers] = useState();
    const [teams, setTeams] = useState();
    const [whichGroup, setWhichGroup] = useState(true);
    const user = useSelector(state => state)
    const token = user.token
    
    const loadData = async () => {
        try{
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token, },
            };
            await fetch(`http://localhost:3030/users?$limit=50`, requestOptions)
                .then(response => response.json())
                .then(data => { 
                    let filteredData = []
                    data.data.map((item, index) => {
                        if(item.teamId === null){
                            filteredData.push(item)
                        }
                    })

                   setPlayers(filteredData)
                });
            await fetch('http://localhost:3030/teams', requestOptions)
            .then(response => response.json())
            .then(data => { 
                setTeams(data.data)
            });
            
        }catch(error){
        }
    };

    useEffect(() =>{
        loadData()
    },[])

    const createTeam = async (values) => {
        let teamId
        try{
            const requestOptions1 = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
                body: JSON.stringify({name: values.name })
            };

            await fetch('http://localhost:3030/teams', requestOptions1)
            .then(response => response.json())
            .then(data => {
                teamId = data.id
            });
            
            const requestOptions2 = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
                body: JSON.stringify({teamId: teamId })
            };

            await fetch(`http://localhost:3030/users/${pickedPlayer1.id}`, requestOptions2)
            await fetch(`http://localhost:3030/users/${pickedPlayer2.id}`, requestOptions2)
            
            const requestOptions3 = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
                body: JSON.stringify({teamId: teamId })
            };

            if(whichGroup === true){
                await fetch(`http://localhost:3030/group-one`, requestOptions3)
                setWhichGroup(!whichGroup)
                toast.success("Equipe ajoutée à la poule 1")
            }else{
                await fetch(`http://localhost:3030/groupe-two`, requestOptions3)
                setWhichGroup(!whichGroup)
                toast.success("Equipe ajoutée à la poule 2")
            }

        }catch(error){
        }
        loadData()
        setPickedPlayer1(null)
        setPickedPlayer2(null)
    };

    let playersList, teamsList

    if(players){
        playersList = players.map((player, index) => {
            return(
                <>
                    <div className="listeItems">{player.pseudo}</div>
                </>
            )
        })
    }

    if(teams){
        teamsList = teams.map((team, index) => {
            console.log("flag", team)
            return(
                <>
                    <div >{team.name} : </div>
                    <div>{team.users ? `(${team.users[0].pseudo} et ${team.users[1].pseudo})` : null}</div>
                </>
            )
        })
    }

    const handlePickPlayer = async () => {
        
        if(pickedPlayer1 != null){
            let randomPick = players[Math.floor(Math.random() * players.length)];

            while(randomPick.id === pickedPlayer1.id){
                randomPick = players[Math.floor(Math.random() * players.length)];
            }
            setPickedPlayer2(randomPick)
        }else{
            
            const randomValue = players[Math.floor(Math.random() * players.length)];
            setPickedPlayer1(randomValue)
        }
    }

    return(
        <>
            <div className="tirageTitle">Tirage au sort des équipes</div>
            <div className="tirageContainer">
                <div className="listeContainer">
                    <div className="tirageSecondary">Joueurs</div>
                    <div>{playersList}</div>
                </div>
                <div className="divButton">
                    <Button color="primary" onClick={handlePickPlayer} className="tirageButton">Pick player</Button>
                    {/* <Button color="danger" className="tirageButton">Reset Teams</Button> */}
                </div>
                <div className="listeContainer">
                    <div className="tirageSecondary">Equipes</div>
                    <div>{teamsList}</div>
                </div>
            </div>
            
            <div className="teamContainer">
                {pickedPlayer1 ? 
                    <div className="playerCard">
                        <div className="listeContainer">
                            <div>{` Pseudo : ${pickedPlayer1.pseudo}`}</div>
                            {/* <div>{` Il aime : La choucroute`}</div>
                            <div>{` Il n'aime pas : La guerre en Ukraine`}</div> */}
                        </div>
                    </div>
                :null}
                {pickedPlayer2 ? 
                    <>
                        <div className="inputTeam">
                            <Formik
                                initialValues={{ name: ''}}
                                validate={values => {
                                    const errors = {};
                                    if (!values.name) {
                                    errors.name = 'Required';
                                    toast.error("Un nom d'équipe est requis")
                                    } 
                                    return errors;
                                }}

                                onSubmit={(values, { setSubmitting }) => {
                                    try{
                                        createTeam(values)
                                    }catch(error){
                                        console.log(error)
                                    }
                                }}
                                >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <div className="formInput">
                                            <Field className="formField" type="text" placeholder="Nom d'équipe" name="name" />
                                        </div>
                                        <div className="formInput">
                                            <Button  color="success" type="submit" >
                                                Créer équipe
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                        <div className="playerCard">
                            <div className="listeContainer">
                                <div>{` Pseudo : ${pickedPlayer2.pseudo}`}</div>
                            </div>
                        </div>
                    </>
                :null}
            </div>
        </>
    )
}

export default Tirage;

                    