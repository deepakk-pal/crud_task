<?php
$USER_NAME = "root";
$PASSWORD = '';

try {
    $conn = new PDO('mysql:host=localhost;dbname=crud', $USER_NAME, $PASSWORD);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $query = "SHOW TABLES LIKE 'user_details'";
    $result = $conn->query($query);

    if ($result->rowCount() == 0) {

        $createTableQuery = "
            CREATE TABLE user_details (
                user_id INT AUTO_INCREMENT PRIMARY KEY,
                user_name VARCHAR(25),
                user_email VARCHAR(257),
                user_mobile VARCHAR(15),
                user_gender VARCHAR(10),
                user_state VARCHAR(50)
            )
        ";

        $conn->exec($createTableQuery);
        // echo "Table 'user_details' created successfully.";
    } else {
        // echo "Table 'user_details' already exists.";
    }
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}

if ($_REQUEST["dboperation"] == "fetch") {
    $query = $conn->prepare("SELECT * FROM `user_details`");
    $query->execute();
    $result = $query->fetchAll(PDO::FETCH_ASSOC);
    echo response('true', $result);
}

if ($_REQUEST["dboperation"] == "insert") {
    $Name = $_POST['name'];
    $Email = $_POST['Email'];
    $Phone = $_POST['Phone'];
    $Gender = $_POST['Gender'];
    $state = $_POST['state'];

    $query = "INSERT INTO `user_details`(`user_name`, `user_email`, `user_mobile`, `user_gender`, `user_state`) VALUES (:name, :email, :phone, :gender, :state)";
    $final = $conn->prepare($query);
    $final->bindParam(':name', $Name);
    $final->bindParam(':email', $Email);
    $final->bindParam(':phone', $Phone);
    $final->bindParam(':gender', $Gender);
    $final->bindParam(':state', $state);
    $final->execute();

    echo response('true', "Data inserted successfully");
}

if ($_REQUEST["dboperation"] == "delete") {
    $uid = $_POST['user_id'];
    $query = "DELETE FROM `user_details` WHERE `user_id` = :uid";
    $result = $conn->prepare($query);
    $result->bindParam(':uid', $uid);
    $result->execute();

    if ($result) {
        echo response("true", "record deleted");
    }
}

if ($_REQUEST["dboperation"] == "update") {
    $user_id = $_POST['user_id'];

    $query = "SELECT * from user_details where user_id= :user_id";
    $final = $conn->prepare($query);
    $final->bindParam(':user_id', $user_id);
    $final->execute();
    $result = $final->fetchAll(PDO::FETCH_ASSOC);

    echo response("true", $result);
}

if ($_REQUEST["dboperation"] == "updateRecord") {
    $user_name = $_POST['updated_user_name'];
    $updated_email = $_POST['updated_email'];
    $updated_mobile = $_POST['updated_mobile'];
    $updated_gender = $_POST['updated_gender'];
    $updated_state = $_POST['updated_state'];
    $user_id = $_POST['user_id'];

    $query = "UPDATE `user_details` SET `user_name`=:user_name, `user_email`=:updated_email, `user_mobile`=:updated_mobile, `user_gender`=:updated_gender, `user_state`=:updated_state WHERE `user_id` = :user_id";
    $final = $conn->prepare($query);
    $final->bindParam(':user_name', $user_name);
    $final->bindParam(':updated_email', $updated_email);
    $final->bindParam(':updated_mobile', $updated_mobile);
    $final->bindParam(':updated_gender', $updated_gender);
    $final->bindParam(':updated_state', $updated_state);
    $final->bindParam(':user_id', $user_id);
    $final->execute();

    echo response('true', "Record updated successfully");
}

function response($status, $message)
{
    return json_encode(array("status" => $status, "message" => $message));
}
?>
