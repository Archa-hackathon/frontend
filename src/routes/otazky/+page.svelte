<script lang="ts">
	import { API_ROOT } from '$lib/api.js';
	import { fly, fade } from 'svelte/transition';
	import { onMount, tick } from 'svelte';

	type Question = {
		question: string;
		answers: {
			answer: string;
		}[];
	};

	let questions: Question[] = [];
	let questionIndex: number = 0;

	let score: number = 0;

	let shouldDisplayFinalScore: boolean = false;

	class Correct {}
	class Wrong {}

	let displayAnswer: null | Wrong | Correct = null;

	async function getQuestions(): Promise<Question[]> {
		const url = `${API_ROOT}/otazky/get_questions`;
		const response = await fetch(url);
		const data = await response.json();
		if (data.success) {
			return data.questions;
		} else {
			return [];
		}
	}

	onMount(async () => {
		questions = await getQuestions();
	});

	function nextQuestion() {
		if (questionIndex < questions.length - 1) {
			// Now move to the next question
			questionIndex++;
			displayAnswer = null;
		}
		if (questionIndex == questions.length - 1) {
			displayFinalScore();
		}
	}

	async function handleSubmit(event: any) {
		const url = `${API_ROOT}/otazky/answer_question`;
		const body = {
			question: questions[questionIndex].question,
			answer: questions[questionIndex].answers.indexOf(
				event.target.parentElement.querySelector('input:checked').value
			)
		};

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		});
		const data = await response.json();
		console.log(data);
		if (data.success) {
			if (data.correct) {
				console.log('Correct answer');
				displayAnswer = Correct;
				score++;
			} else {
				console.log('Wrong answer');
				displayAnswer = Wrong;
			}
		}
	}

	function displayFinalScore() {
		shouldDisplayFinalScore = true;
	}

    function reset() {
        window.location.reload();
    }
</script>

<div class="h-[100svh] w-screen justify-center flex flex-col">
	{#if shouldDisplayFinalScore}
        <div class="mt-8 ml-8 mr-8 bg-base-200 rounded-lg pt-4 mb-2">
            <h1 class="text-2xl text-secondary text-center">Konečné skóre: {score}</h1>
            <button class="btn btn-primary w-full mt-2" on:click={reset}>Začít znovu</button>
        </div>
    {:else}
		{#if questions.length > 0}
		{#each questions as question}
			{#if question === questions[questionIndex]}
				<!-- Outgoing question flies out to the left, incoming question flies in from the right -->
				<div in:fly={{ x: 1000, duration: 1000, delay: 300 }} out:fly={{ y: -250, duration: 250 }}>
					<h1 class="text-2xl text-secondary text-center">{question.question}</h1>
					{#if displayAnswer == Correct}
						<div class="mt-8 ml-8 mr-8 bg-base-200 rounded-lg pt-4 mb-2">
							<p class="text-center text-2xl text-primary">Správně!</p>
							<button class="btn btn-primary w-full mt-2" on:click={nextQuestion}
								>Další otázka</button
							>
						</div>
					{:else if displayAnswer == Wrong}
						<div class="mt-8 ml-8 mr-8 bg-base-200 rounded-lg pt-4 mb-2">
							<p class="text-center text-2xl text-primary">Špatně!</p>
							<button class="btn btn-primary w-full mt-2" on:click={nextQuestion}
								>Další otázka</button
							>
						</div>
					{:else}
						<div class="mt-8 ml-8 mr-8 bg-base-200 rounded-lg pt-4 mb-2">
							{#each question.answers as answer}
								<div class="form-control mb-2">
									<label class="label cursor-pointer mx-16">
										<input
											type="radio"
											name="radio-10"
											class="radio checked:bg-primary"
											value={answer}
											checked={false}
										/>
										<span class="label-text text-base text-left w-full ml-4">{answer}</span>
									</label>
								</div>
							{/each}
							<button class="btn btn-primary w-full mt-2" on:click={handleSubmit}>Odeslat</button>
						</div>
					{/if}
				</div>
			{/if}
		{/each}
		{:else}
			<div class="h-[100svh] w-screen justify-center flex flex-col text-center self-center">
				<p class="text-2xl mx-8">Momentálně nejsou dostupné žádné otázky.</p>
			</div>
		{/if}
	{/if}
</div>
