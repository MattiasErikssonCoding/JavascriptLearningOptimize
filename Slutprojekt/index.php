<?php $title='HTML5 Canvas game'; include(__DIR__ . 'plattform/header.php'); ?>

<h2>FPS: <span id="fps">0</span></h2>
<canvas id='canvas1' width='900' height='600'>
  	Your browser does not support the element HTML5 Canvas.
</canvas>
<audio id="player" src="msc/2NRO8OT_-_Play_Intro.mp3"/>
<audio id="actionsound" src="msc/187055__lloydevans09__space-blast-wave-picture.wav"/>

<?php $path=__DIR__; include(__DIR__ . 'plattform/footer.php'); ?>

