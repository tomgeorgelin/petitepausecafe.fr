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
					{{
						comment.user_id !== null
							? comment.user_id.name
							: 'Auteur inexistant'
					}}
				</div>
				<div
					v-if="
						useSession().status.value === 'authenticated' &&
						comment.user_id !== null &&
						(comment.user_id._id ===
							// @ts-ignore
							useSession().data?.value?.user?.id ||
							state.permission)
					"
					class="text-gray-600 text-xs hover:underline cursor-pointer"
					@click="handleDelete()"
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
					@click="handleToggleAddComment()"
					class="cursor-pointer px-3 py-2 w-fit ml-auto text-xs font-semibold border text-gray-500 border-gray-500 rounded-md"
				>
					{{ !state.toggleAddComment ? 'Répondre' : 'Annuler' }}
				</div>
			</div>
		</div>
		<div class="mt-2">
			{{ comment.body }}
		</div>
		<div v-if="state.toggleAddComment">
			<textarea
				class="w-full mt-5 border rounded-md focus:outline-none focus:ring-2 focus:ring-tint"
				v-model="state.body"
			></textarea>
			<div
				@click="handleAddComment()"
				class="cursor-pointer px-3 py-2 w-fit ml-auto text-xs font-semibold border border-tint text-tint rounded-md"
			>
				Envoyer
			</div>
		</div>
	</div>
	<div class="ml-10 my-5">
		<CommonComment
			v-for="(comment, index) in props.comment.replies"
			:comment="comment"
			:key="index"
			:article_id="article_id"
		/>
	</div>
	<hr class="my-10" v-if="comment.parent_id === null" />
</template>

<script lang="ts" setup>
let perm = false;
if (useSession().status.value === 'authenticated') {
	if (await checkAuthorization('comments', 'moderate')) {
		perm = true;
	}
}
const state = reactive({
	toggleAddComment: false,
	body: '',
	permission: perm,
});
const props = defineProps({
	comment: {
		type: Object,
		required: true,
	},
	article_id: {
		type: String,
		required: true,
	},
});
const handleToggleAddComment = () => {
	state.toggleAddComment = !state.toggleAddComment;
};
const handleDelete = async () => {
	const { data, error } = await useFetch(
		'/api/comments/' + props.comment._id,
		{
			headers: {
				// @ts-ignore
				'x-auth-token': useSession()?.data?.value?.user?.token || '',
			},

			method: 'put',
		}
	);
	// @ts-ignore
	if (data.value && data.value.message && data.value.message === 'ko') {
		console.log('#TODO');
	} else {
		console.log('#TODO ERROR');
	}
};
const handleAddComment = async () => {
	const { data, error } = await useFetch('/api/comments', {
		headers: {
			// @ts-ignore
			'x-auth-token': useSession()?.data?.value?.user?.token || '',
		},
		method: 'post',
		body: {
			email: useSession().data?.value?.user?.email ?? '',
			body: state.body,
			parent: props.comment._id,
			article_id: props.article_id,
		},
	});
	if (data.value && data.value.message === 'ok') {
		state.toggleAddComment = false;
		state.body = '';
		// @ts-ignore
		data.value.comment.replies = [];
		// @ts-ignore
		props.comment.replies.push(data.value.comment);
	}
};
</script>
