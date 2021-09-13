<template>
  <div id="main"  >
  	<div class="totalNum">
  		<div>
  			<p>3</p>
  			<p>借用单号数</p> 
  		</div>
  		<div>
  			<p>4</p>
  			<p>装备库存数</p>  
  		</div>
  		<div>
  			<p>5</p>
  			<p>借用超期数</p>
  		</div>
  		<div>
  			<p>6</p>
  			<p>异常报警数</p>
  		</div>
  	</div>
  	
  	<div class="listInfo">
  		<div class="listInfoTitle">
  			<span style="white-space:pre">   </span><span class="line"></span>
  			<span style="white-space:pre">   </span><span class="txt">告警信息</span>
  			<span style="white-space:pre">   </span><span class="line1"></span>
  		</div>
  		<div class="listInfoMain">
  			
  		</div>
  	</div>
  </div>
</template>
<script>
  
</script>

<style lang="scss" scoped>
 *{
 			margin: 0;
 			padding: 0;
 			font-size: 16px;
 			list-style-type: none;
 		}
 @media only screen and (min-width:1240px ) {
 	#main{
 		width: 1720px;
 		overflow-x: auto;
 	}
 		.totalNum{
 			padding: 30px 200px;
 			display: flex;
 			justify-content: space-around;
 		}
 		.totalNum div{
 			height: 95px;
 			width: 284px;
 			background-repeat: no-repeat;
 			background-size: 100% 100%;
 			text-align: center;
 			color: white;
 		}
 		.totalNum div p:first-child{
 			height: 60px;
 			font-size: 30px;
 			line-height: 60px;
 		}
 		.totalNum div p:first-child:hover{
 			cursor: pointer;
 		}
 		.totalNum div:first-child{
 			
 			background-image: url("../assets/image/mb.png");
 		}
 		.totalNum div:nth-child(2){
 			background-image: url("../assets/image/mb1.png");
 		}
 		.totalNum div:nth-child(3){
 			background-image: url("../assets/image/mb3.png");
 		}
 		.totalNum div:last-child{
 			background-image: url("../assets/image/mb4.png");
 		}
 		.listInfoTitle {
 		    height: 60px;
 		    line-height: 60px;
 		    text-align: center;
 		}
 		.listInfoTitle .line {
 		    display: inline-block;
 		    width: 5%;
 		    border-top: 1px solid #E2E2E2;
 		}
 		.listInfoTitle .line1 {
 		    display: inline-block;
 		    width: 85%;
 		    border-top: 1px solid #E2E2E2;
 		}
 		.listInfoTitle .txt {
 		    color: #555;
 			font-size: 20px;
 		    vertical-align: middle;
 			text-align: left;
 		}
 		.listInfoMain{
 			text-align: center;
 			width: 90%;
 			border: #245DB7 solid 1px;
 			height: 400px;
 			margin-left: 5%;
 		}
 	}
 	@media only screen and (min-width: 1000px) and (max-width: 1240px) {
 		#main{
 			width: 1240px;
 			overflow-x: auto;
 		}
 			.totalNum{
 				padding: 30px 200px;
 				display: flex;
 				justify-content: space-around;
 			}
 			.totalNum div{
 				height: 95px;
 				width: 210px;
 				background-repeat: no-repeat;
 				background-size: 100% 100%;
 				text-align: center;
 				color: white;
 			}
 			.totalNum div p:first-child{
 				height: 60px;
 				font-size: 30px;
 				line-height: 60px;
 			}
 			.totalNum div p:first-child:hover{
 				cursor: pointer;
 			}
 			.totalNum div:first-child{
 				
 				background-image: url("../assets/image/mb.png");
 			}
 			.totalNum div:nth-child(2){
 				background-image: url("../assets/image/mb1.png");
 			}
 			.totalNum div:nth-child(3){
 				background-image: url("../assets/image/mb3.png");
 			}
 			.totalNum div:last-child{
 				background-image: url("../assets/image/mb4.png");
 			}
 			.listInfoTitle {
 			    height: 60px;
 			    line-height: 60px;
 			    text-align: center;
 			}
 			.listInfoTitle .line {
 			    display: inline-block;
 			    width: 5%;
 			    border-top: 1px solid #E2E2E2;
 			}
 			.listInfoTitle .line1 {
 			    display: inline-block;
 			    width: 78%;
 			    border-top: 1px solid #E2E2E2;
 			}
 			.listInfoTitle .txt {
 			    color: #555;
 				font-size: 20px;
 			    vertical-align: middle;
 				text-align: left;
 			}
 			.listInfoMain{
 				text-align: center;
 				width: 90%;
 				border: #245DB7 solid 1px;
 				height: 400px;
 				margin-left: 5%;
 			}
 	}
 @media only screen and (max-width: 1000px) {
 	#main{
 		width: 1000px;
 		overflow-x: auto;
 	}
 		   .totalNum{
 		   	padding: 30px 150px;
 		   	display: flex;
 		   	justify-content: space-around;
 		   }
 		   .totalNum div{
 		   	height: 95px;
 		   	width: 204px;
 		   	background-repeat: no-repeat;
 		   	background-size: 100% 100%;
 		   	text-align: center;
 		   	color: white;
 		   }
 		   .totalNum div p:first-child{
 		   	height: 60px;
 		   	font-size: 30px;
 		   	line-height: 60px;
 		   }
 		   .totalNum div p:first-child:hover{
 		   	cursor: pointer;
 		   }
 		   .totalNum div:first-child{
 		   	background-image: url("../assets/image/mb.png");
 		   }
 		   .totalNum div:nth-child(2){
 		   	background-image: url("../assets/image/mb1.png");
 		   }
 		   .totalNum div:nth-child(3){
 		   	background-image: url("../assets/image/mb3.png");
 		   }
 		   .totalNum div:last-child{
 		   	background-image: url("../assets/image/mb4.png");
 		   }
 		   .listInfoTitle {
 		       height: 60px;
 		       line-height: 60px;
 		       text-align: center;
 		   }
 		   .listInfoTitle .line {
 		       display: inline-block;
 		       width: 5%;
 		       border-top: 1px solid #E2E2E2;
 		   }
 		   .listInfoTitle .line1 {
 		       display: inline-block;
 		       width: 79%;
 		       border-top: 1px solid #E2E2E2;
 		   }
 		   .listInfoTitle .txt {
 		       color: #555;
 		   	font-size: 20px;
 		       vertical-align: middle;
 		   	text-align: left;
 		   }
 		   .listInfoMain{
 		   	text-align: center;
 		   	width: 90%;
 		   	border: #245DB7 solid 1px;
 		   	height: 400px;
 		   	margin-left: 5%;
 		   }
 	}
</style>
