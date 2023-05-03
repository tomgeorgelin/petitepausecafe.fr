<template>
	<div class="bg-white">
		<div class="flex flex-row items-center">
			<div class="rounded-[100%] basis-auto">
				<img
					src="https://cdn.pixabay.com/photo/2017/06/13/12/54/profile-2398783_1280.png"
					alt=""
					width="40"
				/>
			</div>
			<div class="basis-2/6 pl-3 flex flex-row gap-3 items-baseline">
				<div>
					{{ comment.user_id.name }}
				</div>
				<div
					v-if="
						useSession().status.value === 'authenticated' &&
						(comment.user_id._id ===
							useSession().data.value.user.id ||
							permission)
					"
					class="text-gray-600 text-xs hover:underline cursor-pointer"
					@click="this.handleDelete()"
				>
					Supprimer
				</div>
			</div>
			<div class="text-xs text-gray-500 basis-1/3">
				{{
					new Date(comment.createdAt).toLocaleString('fr-FR', {
						day: 'numeric',
						month: 'long',
						year: 'numeric',
						hour: 'numeric',
						minute: 'numeric',
					})
				}}
			</div>
			<div
				class="basis-1/3"
				v-if="useSession().status.value === 'authenticated'"
			>
				<div
					@click="this.handleToggleAddComment()"
					class="cursor-pointer px-3 py-2 w-fit ml-auto text-xs font-semibold border text-gray-500 border-gray-500 rounded-md"
				>
					{{ !toggleAddComment ? 'Répondre' : 'Annuler' }}
				</div>
			</div>
		</div>
		<div class="mt-2">
			{{ comment.body }}
		</div>
		<div v-if="toggleAddComment">
			<textarea
				class="w-full mt-5 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5480]"
				v-model="body"
			></textarea>
			<div
				@click="this.handleAddComment()"
				class="cursor-pointer px-3 py-2 w-fit ml-auto text-xs font-semibold border border-[#FF5480] text-[#FF5480] rounded-md"
			>
				Envoyer
			</div>
		</div>
	</div>
	<div class="ml-10 my-5">
		<CommonComment
			v-for="(comment, index) in comment.replies"
			:comment="comment"
			:key="index"
			:article_id="article_id"
		/>
	</div>
	<hr class="my-10" v-if="comment.parent_id === null" />
</template>

<script>
export default {
	props: {
		comment: {
			type: Object,
			required: true,
		},
		article_id: {
			type: String,
			required: true,
		},
	},
	async setup() {
		let perm = false;
		if (useSession().status.value === 'authenticated') {
			if (await checkAuthorization('comments', 'moderate')) {
				perm = true;
			}
		}
		return {
			toggleAddComment: false,
			body: '',
			permission: perm,
		};
	},
	methods: {
		handleToggleAddComment() {
			this.toggleAddComment = !this.toggleAddComment;
		},
		async handleDelete() {
			const { data, error } = await useFetch(
				'/api/comments/' + this.comment._id,
				{ method: 'delete' }
			);
			if (data.value.message === 'ko') {
				console.log('#TODO');
			} else {
				console.log(data.value.message);
			}
		},
		async handleAddComment() {
			const { data, error } = await useFetch('/api/comments', {
				method: 'post',
				body: {
					email: useSession().data.value.user.email,
					body: this.body,
					parent: this.comment._id,
					article_id: this.article_id,
				},
			});
			if (data.value && data.value.message === 'ok') {
				this.toggleAddComment = false;
				this.body = '';
				data.value.comment.replies = [];
				this.comment.replies.push(data.value.comment);
			}
		},
	},
};
</script>
