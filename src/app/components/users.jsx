import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import User from "./user";
import api from "../api";
import PropTypes from "prop-types";
import GroupList from "./groupList";

const Users = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState(api.professions.fetchAll());
    const count = props.users.length;
    const pageSize = 4;

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);

    const handleProffessionSelect = (params) => {
        console.log(params);
    };

    console.log(professions);

    const handlePageChange = (pageIndex) => {
        console.log("page: ", pageIndex);
        setCurrentPage(pageIndex);
    };

    const userCrop = paginate(props.users, currentPage, pageSize);

    return (
        <>
            {professions && <GroupList items={professions} onItemSelect={handleProffessionSelect} valueProperty="_id" contentProperty="name" /> }
            <table className="table">
                {count > 0 && (
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                )}
                <tbody>
                    {userCrop.map((user) => (
                        <User
                            key={user._id}
                            user={user}
                            onDelete={props.onDelete}
                            bookmark={user.bookmark}
                        />
                    ))}
                </tbody>
            </table>
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    );
};

Users.propTypes = {
    onDelete: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Users;
