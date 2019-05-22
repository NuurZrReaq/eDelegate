<?php
header('Access-Control-Allow-Origin: *');
error_reporting(E_ERROR | E_PARSE);
$db = new mysqli("localhost:3306","root","","dbwebproject");
$CatJson;
$CatObj = new ArrayObject();
if(isset($_REQUEST["Operation"])) {
    $Operation = $_REQUEST["Operation"];
    $CatName = $_REQUEST["CatName"];
    switch($Operation) {
        case "Specifications":
            $query = "Select id from Categories where statusId =1 and Name ='".$CatName."'";
            $result = $db->query($query);
            if($result->num_rows>0){
                $row = $result->fetch_assoc();
                $CatId = $row["id"];
                $query = "Select SpecId from categoryspec where statusId=1 and CategoryId=".$CatId;
                $result = $db->query($query);
                if($result->num_rows>0){
                    $i=2;
                    while ($row=$result->fetch_row()){
                        $specId = $row[0];
                        $query = "Select Name from Specifications where Id=".$specId;
                        $result1 = $db->query($query);
                        $row1 = $result1->fetch_row();
                        $CatObj[i] = $row1;
                        $i ++ ;
                    }
                    $CatObj[1] = $i-3;

                }
                else{//No Spec Found
                    $CatObj[0] = "No Spec Found";

                }
            }
            else {//No Categories
                $CatObj[0] = "Category Not Found";
            }
        default : $CatObj["Unknown Operation"];
    }
}
else{
    $CatObj[0] = "No Operation";
}
$CatJson = json_encode($CatObj);
echo $CatJson;