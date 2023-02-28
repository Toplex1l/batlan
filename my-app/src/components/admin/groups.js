import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';
import {redirect, useNavigate} from "react-router-dom"
import { Input, Button, Table, ModalHeader, ModalFooter } from 'reactstrap'
import logo from "../../assets/battelan.png"
import Modal from 'react-modal';
import { Formik, Form, Field } from 'formik';
const Groups = () => {
    const [groupOne, setGroupOne] = useState();
    const [groupTwo, setGroupTwo] = useState();
    const [active, toggle] = useState(false);
    const [toPush, setToPush] = useState();
    const user = useSelector(state => state)
    const token = user.token
    let navigate = useNavigate();

    useEffect(() => {
        loadData()
      }, []);

    const loadData = async () => {
        try{
            const getGroup = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token, },
            };
            await fetch('http://localhost:3030/group-one', getGroup)
                .then(response => response.json())
                .then(data => { 
                    setGroupOne(data.data);
                });

            await fetch('http://localhost:3030/groupe-two', getGroup)
            .then(response => response.json())
            .then(data => { 
                setGroupTwo(data.data)
            });

        }catch(error){
            console.log(error)
        }
    }

    let groupOneList, groupTwoList

    if(groupOne){
        groupOneList = groupOne.map((team, index) => {
            return(
                <>  
                    <tr className="underLineTableGroup">
                        <th className="fontTableGroup">{team.team.name}</th>
                        <th className="fontTableGroup" 
                            onClick={() => handleToggle({id: team.id, game:1, group: "group-one", name:team.team.name, gameName:"Worms"})}>
                                {team.gameOne}
                        </th>
                        <th className="fontTableGroup" 
                            onClick={() => handleToggle({id: team.id, game:2, group: "group-one", name:team.team.name, gameName:"TrackMania"})}>
                                {team.gameTwo}
                        </th>
                        <th className="fontTableGroup" 
                            onClick={() => handleToggle({id: team.id, game:3, group: "group-one", name:team.team.name, gameName:"Mario Kart"})}>
                                {team.gameThree}
                        </th>
                        <th className="fontTableGroup" 
                            onClick={() => handleToggle({id: team.id, game:4, group: "group-one", name:team.team.name, gameName:"Trials"})}>
                                {team.gameFour}
                        </th>
                        <th className="fontTableGroup">{team.total}</th>
                    </tr>
                </>
            )
        })
    }

    if(groupTwo){
        groupTwoList = groupTwo.map((team, index) => {
            return(
                <>  
                    <tr className="underLineTableGroup">
                        <th className="fontTableGroup">{team.team.name}</th>
                        <th className="fontTableGroup" 
                            onClick={() => handleToggle({id: team.id, game:1, group: "groupe-two", name:team.team.name, gameName:"Worms"})}>{team.gameOne}</th>
                        <th className="fontTableGroup" 
                            onClick={() => handleToggle({id: team.id, game:2, group: "groupe-two", name:team.team.name, gameName:"TrackMania"})}>
                                {team.gameTwo}
                        </th>
                        <th className="fontTableGroup" 
                            onClick={() => handleToggle({id: team.id, game:3, group: "groupe-two", name:team.team.name, gameName:"Mario Kart"})}>
                                {team.gameThree}
                        </th>
                        <th className="fontTableGroup" 
                            onClick={() => handleToggle({id: team.id, game:4, group: "groupe-two", name:team.team.name, gameName:"Trials"})}>
                                {team.gameFour}
                        </th>
                        <th className="fontTableGroup">{team.total}</th>
                    </tr>
                </>
            )
        })
    }

    const handleToggle = (props) => {
        if(user.isAdmin === true){
            setToPush({id:props.id, game:props.game, group:props.group, gameName:props.gameName, name:props.name})
            toggle(!active)
        }
    }

    const handleClose = () => {
        toggle(!active)
        setToPush(null)
    }

    const pushPoints = async (props) => {
        try{
            let body

            switch(props.toPush.game){
                case 1:
                    body = JSON.stringify({gameOne: props.values.score})
                    break
                case 2:
                    body = JSON.stringify({gameTwo: props.values.score})
                    break
                case 3:
                    body = JSON.stringify({gameThree: props.values.score})
                    break
                case 4:
                    body = JSON.stringify({gameFour: props.values.score})
                    break
                default : console.log("default")
            }

            const updatePoints = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token, },
                body: body
            };

            await fetch(`http://localhost:3030/${props.toPush.group}/${props.toPush.id}`, updatePoints)
                .then(response => response.json())
                .then(data => {
                    loadData()
                });
            toast.success("Score mis à jour")
        }catch(error){
            toast.error("Une erreur est survenue")
            console.log(error)
        }
    }
    const customStyles = {
        overlay: {
            background:"transparent",
          },
        content: {
            borderColor:"rgb(22, 22, 22)",
            radius:'10%',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            background:'rgb(39, 39, 39)',
            transform: 'translate(-50%, -50%)',
        },
      };

    return(
        <>
            <img src={logo} className="logoGroup" alt='logo'></img>
            <div className="groupContainer">
                <div>
                    <div className="groupSecondary">POULE 1</div>
                    <div className="tableContainer">
                        <Table>
                            <thead className="headerTableGroup">
                                <tr>
                                    <th className="headerName">Nom d'équipe</th>
                                    <th className="headerGame">Worms</th>
                                    <th className="headerGame">TrackMania</th>
                                    <th className="headerGame">Mario Kart</th>
                                    <th className="headerGame">Trials</th>
                                    <th className="headerTotal">Total de points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groupOne ? groupOneList : <div className="noEquip">Pas d'équipe dans cette poule</div>}
                            </tbody>
                        </Table>
                    </div>
                </div>
                <div>
                    <div>
                        <div className="groupSecondary">POULE 2</div>
                        <div className="tableContainer">
                            <Table className="tableGroup">
                                <thead className="headerTableGroup">
                                    <tr>
                                        <th className="headerName">Nom d'équipe</th>
                                        <th className="headerGame">Worms</th>
                                        <th className="headerGame">TrackMania</th>
                                        <th className="headerGame">Mario Kart</th>
                                        <th className="headerGame">Trials</th>
                                        <th className="headerTotal">Total de points</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {groupTwoList ? groupTwoList : <div className="noEquip">Pas d'équipe dans cette poule</div>}
                                </tbody>
                            </Table>
                        </div>
                        </div>
                    </div>
            </div>
            {user.isAdmin ? null : null}
            
            <Modal
                isOpen={active}
                style={customStyles}
                onClose={handleClose}
            >
                <ModalHeader>
                    <div className="modalHeader">
                        <div className="modalTitle">{toPush ? `${toPush.name} sur ${toPush.gameName}` : null}</div>
                        <dix className="closeModal" onClick={handleClose}>x</dix>
                    </div>
                </ModalHeader>
                <div className="modalBody">
                <Formik
                        initialValues={{ score: '' }}
                        validate={values => {
                            const errors = {};
                            if (!values.score) {
                            errors.score = 'Required';
                            } 
                            return errors;
                        }}

                        onSubmit={(values, { setSubmitting }) => {
                            try{
                                pushPoints({values, toPush})
                                handleClose()
                            }catch(error){
                                console.log(error)
                            }
                        }}
                        >
                        {({ isSubmitting }) => (
                            <>
                                <Form>
                                    <div className="formInput">
                                        <Field className="formField" type="number" placeholder="Score" name="score" />
                                    </div>
                                    <Button color="success" type="submit" className="buttonModal">
                                        Enregistrer
                                    </Button>
                                </Form>
                            </>
                        )}
                    </Formik>
                </div>
            </Modal>
        </>
    )
}

export default Groups;