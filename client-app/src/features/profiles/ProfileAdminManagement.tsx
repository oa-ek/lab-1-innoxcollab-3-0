import { observer } from "mobx-react-lite";
import ProfileTable from "./ProfileTable";

export default observer(function ProfileAdminManagement() {

    return (
        <div style={{ display: "flex", width: "1200px" }}>
            <ProfileTable />
        </div>
    );
})