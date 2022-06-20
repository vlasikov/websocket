<?php
// Получить метод запроса
$method = $_SERVER['REQUEST_METHOD'];
?>
<?php
if ($method === 'POST'){
    //$lib = $_REQUEST['lib'];
    //$req = $_REQUEST['req'];
    //"time":"<?=gmdate("d.m.Y H:i:s T Y"); >",
    //"file":"<?=$str; >"
    $str[0] = htmlentities(file_get_contents("temp-data.txt"));
    $str[1] = htmlentities(file_get_contents("temp-data-ya.txt"));
    //=$str;
    //"time":"<?=gmdate("d.m.Y H:i:s T Y"); >",
    //"file":"<?=$str; >"
?>
    <?=$str[0];?>;<?=$str[1];?>
<?php    
}
?>