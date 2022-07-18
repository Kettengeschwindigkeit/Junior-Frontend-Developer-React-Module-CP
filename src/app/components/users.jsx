import Pagination from "./pagination"
import User from "./user"

const Users = (props) => {
    const count = props.users.length
    const pageSize = 4
    const handlePageChange = (pageIndex) => {
        console.log("page: ", pageIndex)
    }
    return (
        <>
            <table className="table">
                {count > 0
                    && <thead>
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
                }
                <tbody>
                    {props.users.map(user => <User key={user._id} user={user} onDelete={props.onDelete} bookmark={user.bookmark} />)}
                </tbody>
            </table>
            <Pagination itemsCount={count} pageSize={pageSize} onPageChange={handlePageChange} />
        </>
    )
}

export default Users
