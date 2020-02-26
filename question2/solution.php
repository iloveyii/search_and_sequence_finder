<?php
$s = [1, 4, 5, 2, 6];
function getSequence($i, $s)
{
    $tmp = [];
    $upper = count($s);
    $number = $s[$i];
    array_push($tmp, $number);

    for ($j = $i+1; $j < $upper; $j++) {
        if($number < $s[$j]) {
            $number = $s[$j];
            array_push($tmp, $number);
        } else {
            // print( "{$number} is not less than " . $s[$j] . ',');
        }

    }
    return $tmp;
}

function findLIS($s)
{
    $sequences = [];
    // Generate all sequences
    foreach ($s as $i => $n) {
        $sequences[$i] = getSequence($i, $s);
    }

    // Find the lenght of each sequence and return max out of them
    $max = 0; $index = 0;
    foreach ($sequences as $i=>$sequence) {
        if($max < count($sequence)) {
            $max = count($sequence);
            $index = $i;
        }
    }

    // print('Ans:' . $max);
    // print_r($sequences[$index]);
    return $max;
}


// Remove the following lines for testing online - test cases
print(findLIS([1,4,5,2,6])); // 4
print(PHP_EOL);

print(findLIS([1,4,3])); // 2
print(PHP_EOL);

print(findLIS([ 2, 3, 3, 5 ])); // 3
print(PHP_EOL);

// Run as
// php solution.php

