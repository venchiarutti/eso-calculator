import React, { useState, useEffect } from 'react';

const WorldRecordsPage = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    const allContents = [
        { contentName: "Aetherian Archive", type: "12 members" },
        { contentName: "Hel Ra Citadel", type: "12 members" },
        { contentName: "Sanctum Ophidia", type: "12 members" },
        { contentName: "Maw of Lorkhaj", type: "12 members" },
        { contentName: "The Halls of Fabrication", type: "12 members" },
        { contentName: "Asylum Sanctorium", type: "12 members" },
        { contentName: "Cloudrest", type: "12 members" },
        { contentName: "Sunspire", type: "12 members" },
        { contentName: "Kyne's Aegis", type: "12 members" },
        { contentName: "Rockgrove", type: "12 members" },
        { contentName: "Dreadsail Reef", type: "12 members" },
        { contentName: "Sanity's Edge", type: "12 members" },
        { contentName: "Lucent Citadel", type: "12 members" },
        { contentName: "Dragonstar Arena", type: "4 players" },
        { contentName: "Blackrose Prison", type: "4 players" },
        { contentName: "Maelstrom Arena", type: "Solo" },
        { contentName: "Vateshran Hollows", type: "Solo" }
    ];

    useEffect(() => {
        const cachedRecords = localStorage.getItem('worldRecords');
        const lastFetched = localStorage.getItem('lastFetched');
        const now = Date.now();

        if (cachedRecords && lastFetched && (now - lastFetched < 3600000)) {
            setRecords(JSON.parse(cachedRecords));
        } else {
            setLoading(true);
        }

        fetch('https://eso-world-records-api.onrender.com/record', {
            headers: {
                'Authorization': 'Basic ' + btoa('admin:h7HCqcPoK1WcXwlC')
            }
        })
            .then((response) => response.json())
            .then((data) => {
                let processedRecords = [];
                allContents.map((content) => {
                    let filteredRecords = [];
                    data.map((record) => {
                        if(record.contentName === content.contentName) {
                            filteredRecords.push(record);
                        }
                    });
                    
                    filteredRecords.sort((a, b) =>
                        parseInt(b.score.replace(/,/g, '')) - parseInt(a.score.replace(/,/g, ''))
                    );

                    const uniqueRecords = new Map();
                    filteredRecords.forEach((record) => {
                        const key = `${record.teamName}`;
                        const existingRecord = uniqueRecords.get(key);

                        if (!existingRecord || 
                            parseInt(record.score.replace(/,/g, '')) > parseInt(existingRecord.score.replace(/,/g, ''))) {
                            uniqueRecords.set(key, record);
                        }
                    });

                    filteredRecords = Array.from(uniqueRecords.values());

                    if (filteredRecords.length > 3) {
                        filteredRecords.length = 3
                    }
                    processedRecords = processedRecords.concat(filteredRecords);
                });

                localStorage.setItem('worldRecords', JSON.stringify(processedRecords));
                localStorage.setItem('lastFetched', now);

                setRecords(processedRecords);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching records:', error);
                setLoading(false);
            });
    }, []);

    const getRecordsForContent = (contentName) => {
        let filteredRecords = [];
        records.map((record, index) => {
            if(record.contentName === contentName) {
                filteredRecords[index] = record;
            }
        });
        filteredRecords.sort((a, b) => 
            parseInt(b.score.replace(/,/g, '')) - parseInt(a.score.replace(/,/g, ''))
        );
        if (filteredRecords.length > 3) {
            filteredRecords.length = 3;
        }
        return filteredRecords || null;
    };

    const medalClasses = ['medal-gold', 'medal-silver', 'medal-bronze'];

    return (
        <div className="world-records-page">
            <h1>ESO World Records</h1>
            <p className="paragraph">Contact <b>yellow1709</b> in discord if you want to send a new run or claim a existing one.</p>
            <div className="records-grid">
            {true ? (
                //<h1>In the first request in some time it might take 30 seconds to load (Loading...)</h1>
                <h1>Discontinued due to lack of use</h1>
            ) : (
                allContents.map((content, index) => {
                    const records = getRecordsForContent(content.contentName);

                    const sortedRecords = [...records].sort((a, b) => 
                        parseInt(b.score.replace(/,/g, '')) - parseInt(a.score.replace(/,/g, ''))
                    );

                    return (
                        <div className="content-card" key={content.contentName}>
                            <div 
                                className="card-header"
                                style={{
                                    backgroundImage: `url('/content/${content.contentName.replace(/['\s]+/g, '-').toLowerCase()}.png')`
                                }}
                            >
                                <h3>{content.contentName}</h3>
                            </div>
                            <div className="card-body" key={content.contentName}>
                                {records.length > 0 ? (
                                    records.map(
                                        (record, index) => {
                                            const medalClass = record ? medalClasses[sortedRecords.indexOf(record)] : '';
                                            return (
                                                <>
                                                    <div className={`record-card ${medalClass}`}>
                                                        <div className="record-row">
                                                            <p>{record.contentName == 'Maelstrom Arena' || record.contentName == 'Vateshran Hollows' ? 'Player: ' : 'Team: '}{record.contentName == 'Maelstrom Arena' || record.contentName == 'Vateshran Hollows' ? record.players[Object.keys(record.players)[0]] : record.teamName}</p>
                                                            <p>Score: {record.score}</p>
                                                        </div>
                                                        <div className="record-row">
                                                            <p>Time: {record.time}</p>
                                                            <p>Update: {record.update}</p>
                                                        </div>
                                                        {record.contentName == 'Maelstrom Arena' || record.contentName == 'Vateshran Hollows' ? '' : 
                                                        <div className="record-row">
                                                            <details>
                                                                <summary>Players</summary>
                                                                <ul>
                                                                {Object.keys(record.players).map((player) => (
                                                                <li key={player}>{record.players[player]}</li>
                                                                ))}
                                                                </ul>
                                                            </details>
                                                        </div>}
                                                    </div>
                                                </>
                                            )
                                        }
                                    )
                                ) : (
                                    <p>No records available yet.</p>
                                )}
                            </div>
                        </div>
                    );
                })
            )}
            </div>
        </div>
    );
};

export default WorldRecordsPage;