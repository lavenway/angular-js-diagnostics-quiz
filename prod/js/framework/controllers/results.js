(function() {

	'use strict';

	function ResultsController(quizMetrics, dataService) {

		// VM = Virtual model
		var vm = this;

		//Show score feedback tagline
		function calculateScoreTagline(){
			//Loop through all questions in JSON and match score to description
			for(var i = 0; i < dataService.JSONScoreDescription.length; i++){
				var score = quizMetrics.numCorrect,
						matchedScore = dataService.JSONScoreDescription[i].score;

				if(score === matchedScore){
					//do something
					return dataService.JSONScoreDescription[i].tagline;
				}
			}
		}

		//Show score feedback description
		function calculateScoreDescription(){
			//Loop through all questions in JSON and match score to description
			for(var i = 0; i < dataService.JSONScoreDescription.length; i++){
				var score = quizMetrics.numCorrect,
						matchedScore = dataService.JSONScoreDescription[i].score;

				if(score === matchedScore){
					//do something
					return dataService.JSONScoreDescription[i].description;
				}
			}
		}

		//calculate the number of each question answered to determine final output
		function calculateDiagnosticScore(){
			//Loop through all questions in JSON and match score to diagnostic score
			var score = quizMetrics.answerArray;
			var numberOfQuestions = [];
			var matches = [];

			for (var i = 0; i < dataService.JSONDiagnosticResult.length; i++) {
				var matchedScore = dataService.JSONDiagnosticResult[i].score;
				numberOfQuestions.push(matchedScore);

				//console.log(numberOfQuestions);

				for(var j = 0; j < score.length; j++){
	        
	        //If more than one score in the array then we have a tied score
					if(score.length >= 2){
						//console.log('MORE THAN 1');

						//Show the last item in the JSON file
						i = dataService.JSONDiagnosticResult.length -1;

						return dataService.JSONDiagnosticResult[i].title,
									 dataService.JSONDiagnosticResult[i].image,
									 dataService.JSONDiagnosticResult[i].description;
					}

					//Else determine which final result to display
	        else if(numberOfQuestions[i] === score[j]){
	            matches.push(numberOfQuestions[i]);

	            //console.log(score);

	            return dataService.JSONDiagnosticResult[i].title,
										 dataService.JSONDiagnosticResult[i].image,
										 dataService.JSONDiagnosticResult[i].description;
	        }
	    	}

			}
		}

		//Show score percentage
		function calculatePerc(){
			return quizMetrics.numCorrect / dataService.JSONQuizData.length * 100;
		}

		//Show question of clicked legend link
		function setActiveQuestion(index){
			vm.activeQuestion = index;
		}

		//Set the class of the answer - corrrect or incorrect
		function getAnswerClass(index){
			//if index is the same as the correct answers index return class to display
			if(index === dataService.JSONCorrectAnswers[vm.activeQuestion].number){
				//if correct
				return 'bg-success';
			} else if(index === dataService.JSONQuizData[vm.activeQuestion].selected){
				//if incorrect
				return 'bg-danger';
			}
		}

		function reset(){
			quizMetrics.changeState('results', false); 
			//Reset the number of question corrects as we are startin again.
			quizMetrics.numCorrect = 0;
			quizMetrics.answerCount = null;
			quizMetrics.answerArray = [];
			quizMetrics.answermax = null,
			quizMetrics.answerResult = {},
			quizMetrics.duplicateResults = [];

			//Loop through all questions in JSON and reset all flags back to default
			for(var i = 0; i < dataService.JSONQuizData.length; i++){
				var data = dataService.JSONQuizData[i];

				data.selected = null;
				data.correct = null;
			}
		}

		vm.quizMetrics = quizMetrics;
		vm.dataService = dataService;
		vm.getAnswerClass = getAnswerClass;
		vm.reset = reset;
		vm.setActiveQuestion = setActiveQuestion;
		vm.calculatePerc = calculatePerc;
		vm.calculateScoreTagline = calculateScoreTagline;
		vm.calculateScoreDescription = calculateScoreDescription;
		vm.calculateDiagnosticScore = calculateDiagnosticScore;
		vm.activeQuestion = 0;

	}

	angular
		.module('quizFramework')
		.controller('resultsCtrl', ResultsController);

	ResultsController.$inject = ['quizMetrics', 'dataService'];

})();