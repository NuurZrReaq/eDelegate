<?php
header('Access-Control-Allow-Origin: *');
error_reporting(E_ERROR | E_PARSE);
$db = new mysqli("localhost:3306","root","","dbwebproject");
$CatJson;
$CatObj = new ArrayObject();
if(isset($_REQUEST["Operation"])) {
    $Operation = $_REQUEST["Operation"];
    switch($Operation) {
        case "Categories":
            $query = "Select Name from Categories where statusId =1";
            $result = $db->query($query);
            if($result->num_rows>0){
                $row = $result->fetch_all();

                $CatObj[1] = $row;
            }
            else {//No Categories
                $CatObj[0] = "No Categories";
            }
        default : $CatObj[0]="Unknown Operation";
    }
}
else{
    $CatObj[0] = "No Operation";
}
$CatJson = json_encode($CatObj);
echo $CatJson;