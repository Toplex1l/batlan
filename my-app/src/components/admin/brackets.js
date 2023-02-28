import React, { useState, useEffect } from "react";
import { Bracket, RoundProps } from 'react-brackets';
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";

const Brackets = () => {
    const user = useSelector(state => state)
    const token = user.token
    const date = "12 Novembre 2022";
    const [seedsOne, setSeedsOne] = useState([]);
    const [seedsTwo, setSeedsTwo] = useState([]);
    const [seedsThree, setSeedsThree] = useState([]);
    const [groupOne, setGroupOne] = useState();
    const [groupTwo, setGroupTwo] = useState();

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

        setMatches()
    }
    
    const setMatches = () => {
        if(groupOne.length != 3 && groupTwo.length !=3){
            toast.error("Mauvais nombre d'équipes")
        }else{
            console.log("caca",groupOne[0])
            const match = [
                {
                    id:1, 
                    date:date,
                    teams: [{ name:"test" }, { name:"test" }],
                },
                {
                    id:2, 
                    date:date,
                    teams: [{ name:"test" }, { name:"test" }],
                },
                {
                    id:3, 
                    date:date,
                    teams: [{ name:"test" }, { name:"test" }],
                },
                {
                    id:4, 
                    date:date,
                    teams: [{ name: "quentin ", points:"1" }, { name:"test" }],
                },
            ]
            setSeedsOne(match)
        }
    }

    console.log({groupOne, groupTwo})
    const rounds: RoundProps[] = [
        {
            title: 'Round one',
            seeds: seedsOne,
        },
        {
          title: 'Round two',
          seeds: seedsTwo,
        },
      ];
    return(
        <>
            <div>
                <Bracket rounds={rounds} />
                <h1>Match en cours</h1>

            </div>
        </>
    )
}

export default Brackets;

