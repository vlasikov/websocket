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
    $str = htmlentities(file_get_contents("data.txt"));
    //=$str;
    //"time":"<?=gmdate("d.m.Y H:i:s T Y"); >",
    //"file":"<?=$str; >"
?>
    <?=$str;?>
<?php    
}
?>