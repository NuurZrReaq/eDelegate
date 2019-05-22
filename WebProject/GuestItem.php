<?php
/**
 * Created by PhpStorm.
 * User: Noor
 * Date: 4/27/2019
 * Time: 11:45 AM
 */
header('Access-Control-Allow-Origin: *');
error_reporting(E_ERROR | E_PARSE);
$db = new mysqli("localhost:3306","root","","dbwebproject");
$CatJson;
$CatObj = new ArrayObject();
if(isset($_REQUEST["Operation"])) {
    $Operation = $_REQUEST["Operation"];

    switch($Operation) {
        case "getItem":
            $query = "Select * from item where Name ='".$itemName."' and statusId=1";
            $result = $db->query($query);
            if($result->num_rows>0){
                $row = $result->fetch_assoc();
                $catId = $row["CategoryId"];
                $userId = $row["UserId"];
                $CatObj[1]=$row;
                $query = "Select Name,Phone,Mobile,Email,CorpName,Rating from user where id=".$userId." and statusId=1";
                $result = $db->query($query);
                if($result->num_rows>0){
                    $row = $result->fetch_row();
                    $CatObj[2] = $row;
                    $query = "select s.Name,s.Value from specifications as s inner join categoryspecs as cs on cs.SpecId = s.id where cs.CategoryId =".$catId;
                    $result = $db->query($query);
                    if($result ->num_rows>0){
                        $row = $result->fetch_all();
                        $CatObj[3] = $row;
                    }
                    else {//Specs not found
                        $CatObj[0] = "Specs not found";
                    }
                }
                else {//SellerNotFound
                    $CatObj[0] = "Seller is not Found";
                }
            }
            else {//Item is not found
                $CatObj[0] = "Item is not found";
            }
            break;
        //default : echo "Unknown Operation Sent to Login.php";
    }


}
else{
    $CatObj[0] = "Operation is not sent";

}
$CatJson = json_encode($CatObj);
echo $CatJson;