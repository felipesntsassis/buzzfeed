import { Component, OnInit } from '@angular/core';

import quizz_questions from '../../../assets/data/quizz_questions.json';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: [
		'./quizz.component.css',
		'./quizz.component.resp.css'
	]
})
export class QuizzComponent implements OnInit {

	title: string = '';
	questions: any;
	selectedQuestion:any;
	answers: string[] = [];
	selectedAnswer: string = '';
	questionIndex: number = 0;
	questionMaxIndex: number = 0;
	finished: boolean = false;


	ngOnInit(): void {
		if (quizz_questions) {
			this.finished = false;
			this.title = quizz_questions.title;
			this.questions = quizz_questions.questions;
			this.selectedQuestion = this.questions[this.questionIndex];
			this.questionIndex = 0;
			this.questionMaxIndex = this.questions.length;
		}
	}

	playerChoice(value: string) {
		this.answers.push(value);
		this.nextStep();
	}

	async nextStep() {
		this.questionIndex += 1;

		if (this.questionMaxIndex > this.questionIndex) {
			this.selectedQuestion = this.questions[this.questionIndex];
		} else {
			const finalAnswer: string = await this.checkResult(this.answers);
			this.finished = true;
			this.selectedAnswer = quizz_questions.results[
				finalAnswer as keyof typeof quizz_questions.results
			];
		}
	}

	async checkResult(answers: string[]) {
		const result = answers.reduce((prev, curr, i, arr) => {
			if (
				arr.filter(item => item === prev).length >
				arr.filter(item => item === curr).length
			) {
				return prev;
			} else {
				return curr;
			}
		});

		return result;
	}

	newQuestion() {
		this.finished = false;
		this.answers = [];
		this.selectedAnswer = '';
		this.questionIndex = 0;
		this.selectedQuestion = this.questions[this.questionIndex];
	}
}
