import React from "react";
import { auth, database } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useList } from "react-firebase-hooks/database";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Spin, Image } from "antd";
import { equalTo, orderByChild, ref, query, remove } from "firebase/database";
import { NavLink } from "react-router-dom";
const { Meta } = Card;

const InnerUserProfile = (props) => {
  const user = props.user;
  const petRef = query(ref(database, "/pet"), orderByChild("user_uid"), equalTo(user.uid));
  const [snapshots, loading, error] = useList(petRef);
  console.log(snapshots);
  return (
    <>
      <strong>Вы вошли, как {user.email}</strong>
      {error && <strong>Ошибка: {error}</strong>}
      {loading && <Spin size="large" />}
      {!loading && snapshots && (
        <>
          {snapshots.map((snapshot) => (
            <PetCard uid={snapshot.key} key={snapshot.key} pet={snapshot.val()} />
          ))}
        </>
      )}
    </>
  );
};

const PetCard = ({ pet, uid }) => {
  const animalType = () => {
    if (pet.type == "cat") {
   return   "кошка / кот";
    } else if (pet.type == "dog") {
   return   "собака (пёс)";
    } else if (pet.type == "other") {
   return "другое";
    } else {
    return "животное";
    }
  };
  return (
    <Card
      style={{
        width: 300,
      }}
      cover={<Image src={pet.upload} placeholder={<Spin />} />}
      actions={[
        <NavLink to={`/pet/${uid}/edit`}>
          <EditOutlined key="edit" />
        </NavLink>,
        <DeleteOutlined key="delete" />,
      ]}
    >
      <Meta title={`Вид животного: ${animalType()}`} />
    </Card>
  );
};

const UserProfile = () => {
  const [user] = useAuthState(auth);
  if (user !== null) {
    return <InnerUserProfile user={user} />;
  }
};

export default UserProfile;