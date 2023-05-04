<template>
	<div class="px-5 mt-10 flex flex-col gap-10">
		<div class="flex flex-row justify-between items-center">
			<div class="font-semibold text-xl">Commentaires</div>
			<div
				v-if="useSession().status.value === 'authenticated'"
				@click="this.handleToggleAddComment()"
				class="border cursor-pointer rounded-md px-3 py-2 border-tint text-tint"
			>
				Laisser un commentaire
			</div>
		</div>
		<div>
			Politique des commentaires : Nous aimons les commentaires et
			apprécions le temps que les lecteurs consacrent à partager des idées
			et à donner des feedbacks. Toutefois, tous les commentaires sont
			modérés manuellement et ceux considérés comme du spam ou purement
			promotionnels seront supprimés
		</div>
		<div v-if="toggleAddComment">
			<textarea
				class="w-full mt-5 border rounded-md focus:outline-none focus:ring-2 focus:ring-tint"
				v-model="body"
			></textarea>
			<div
				@click="this.handleAddComment()"
				class="cursor-pointer px-3 py-2 w-fit ml-auto text-xs font-semibold border border-tint text-tint rounded-md"
			>
				Envoyer
			</div>
		</div>
		<div v-if="comments">
			<CommonComment
				v-for="(comment, index) in comments"
				:key="index"
				:comment="comment"
				:article_id="article_id"
			/>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		comments: {
			type: Array,
			required: true,
		},
		article_id: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			toggleAddComment: false,
			body: '',
		};
	},
	setup(props) {
		const addChildrenToComments = (comments) => {
			if (!comments) return [];
			const commentObj = [];
			comments.forEach((comment) => {
				if (comment.parent_id === null) {
					commentObj.push(comment);
					comment.replies = [];
				}
			});
			commentObj.forEach((com) => {
				addReplies(com);
			});
			return commentObj;
		};
		const addReplies = (comment) => {
			comment.replies = props.comments.filter((com) => {
				return (
					com.parent_id !== null && comment._id === com.parent_id._id
				);
			});
			comment.replies.forEach((com) => addReplies(com));
		};
		return {
			comments: addChildrenToComments(props.comments),
		};
	},
	methods: {
		handleToggleAddComment() {
			this.toggleAddComment = !this.toggleAddComment;
		},
		async handleAddComment() {
			const { data, error } = await useFetch('/api/comments', {
				method: 'post',
				body: {
					email: useSession().data.value.user.email,
					body: this.body,
					parent: null,
					article_id: this.article_id,
				},
			});
			if (data.value && data.value.message === 'ok') {
				this.toggleAddComment = false;
				this.body = '';
				data.value.comment.replies = [];
				this.comments.unshift(data.value.comment);
			}
		},
	},
};
</script>
