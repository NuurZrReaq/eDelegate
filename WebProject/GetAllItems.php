<?php
/**
 * Created by PhpStorm.
 * User: Noor
 * Date: 4/28/2019
 * Time: 11:32 PM
 */header('Access-Control-Allow-Origin: *');
error_reporting(E_ERROR | E_PARSE);
$db = new mysqli("localhost:3306","root","","dbwebproject");
$CatJson;
$CatObj = new ArrayObject();
if(isset($_REQUEST["Operation"])) {
    $Operation = $_REQUEST["Operation"];
    switch ($Operation) {

        case "GetItems":
            $query = "Select Name from item where statusId =1";
            $result = $db->query($query);
            if ($result->num_rows > 0) {
                $row = $result->fetch_all();
                $CatObj[1] = $row;
            } else {//No Categories
                $CatObj[0] = "No Items";
            }
        default :
            $CatObj["Unknown Operation"];
    }
}
else{
    $CatObj[0] = "No Operation";
}
$CatJson = json_encode($CatObj);
echo $CatJson;


