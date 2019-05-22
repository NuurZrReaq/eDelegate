<?php
/**
 * Created by PhpStorm.
 * User: Noor
 * Date: 4/29/2019
 * Time: 1:04 AM
 */header('Access-Control-Allow-Origin: *');
error_reporting(E_ERROR | E_PARSE);
$db = new mysqli("localhost:3306","root","","dbwebproject");
$CatJson;
$CatObj = new ArrayObject();
if(isset($_REQUEST["Operation"])) {
    $Operation = $_REQUEST["Operation"];

    switch ($Operation) {

        case "GetItems":
            $userName = $_REQUEST["UserName"];
            //$catName = $_REQUEST["catName"]
            $token = $_REQUEST["token"];
                $query = "select id from user where Name = '".$userName."' and StatusId=1 and token='".$token."'";
                $result = $db->query($query);
                if($result->num_rows>0){
                    $row = $result->fetch_assoc();
                    $userId = $row["id"];
                    $query = "Select t1.Name,t1.Description,t1.Price,t2.SrcFile,c.Name from item as t1 INNER JOIN image as t2 on t1.imageId = t2.id 
                              INNER JOIN categories as c ON c.id = item.CategoryId  where t1.UserId=".$userId." and t1.statusId=1";
                    $result=$db->query($query);
                    if($result->num_rows>0){
                        $row = $result->fetch_all();
                        $CatObj[1]=$row;
                        $CatObj[0] = "Success";
                    }
                    else{//No   Items
                        $CatObj[0] = "No Users";
                    }
                }
                else{//no Category
                    $CatObj[0] = "No useers";
                }

            $CatJson = json_encode($CatObj);
            echo $CatJson;
            break;
        default : echo "Unknown Operation Sent to Login.php";

    }
}
