<template>
	<Header />
	<section
		class="flex flex-col md:flex-row gap-5 w-[95%] md:w-[70%] mx-auto px-3 py-5"
	>
		<table class="min-w-full">
			<thead class="bg-white border-b">
				<tr>
					<th
						scope="col"
						class="text-sm text-center font-medium text-gray-900 px-6 py-4"
					>
						Objet
					</th>
					<th
						scope="col"
						class="text-sm text-center font-medium text-gray-900 px-6 py-4"
					>
						Opération
					</th>
					<th
						scope="col"
						class="text-sm text-center font-medium text-gray-900 px-6 py-4"
					>
						Est autorisé
					</th>
					<th
						scope="col"
						class="text-sm text-center font-medium text-gray-900 px-6 py-4"
					>
						Rôle
					</th>
				</tr>
			</thead>
			<tbody>
				<template v-for="permission in permissions">
					<tr
						v-for="(operation, index) in permission.operations"
						:key="index"
						class="bg-gray-100 border-b"
					>
						<td
							class="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap"
						>
							{{ permission.name }}
						</td>
						<td
							class="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap"
						>
							{{ operation.name }}
						</td>
						<td
							class="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap"
						>
							<input
								type="checkbox"
								@change="
									handleChange(
										operation.name,
										permission.name,
										operation.isAuthorized
									)
								"
								v-model="operation.isAuthorized"
							/>
						</td>
						<td
							class="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap"
						>
							{{ permission.role }}
						</td>
					</tr>
				</template>
			</tbody>
		</table>
	</section>
	<Footer />
</template>

<script lang="ts" setup>
definePageMeta({
	middleware: 'auths',
	meta: {
		authority: 3,
		right: { object: 'permissions', operation: 'manage' },
	},
});
const { $toast } = useNuxtApp();
const route = useRoute();
const role = route.query.role;
const { data } = await useFetch('/api/permissions/' + role, {
	headers: {
		// @ts-ignore
		'x-auth-token': useSession()?.data?.value?.user?.token || '',
	},
});
let permissions: any = [];
// @ts-ignore
if (data.value && data.value.message && data.value.message === 'ok') {
	// @ts-ignore
	permissions = data.value.permissions;
}
const handleChange = async (
	operation: string,
	object: string,
	isAuthorized: boolean
) => {
	const { data } = await useFetch('/api/permissions/', {
		headers: {
			// @ts-ignore
			'x-auth-token': useSession()?.data?.value?.user?.token || '',
		},
		method: 'post',
		body: {
			operation,
			object,
			state: isAuthorized,
			roleSlug: role,
		},
	});
	if (data.value && data.value.message && data.value.message === 'ok') {
		$toast.show({
			title: 'Permission ajoutée',
			type: 'success',
			timeout: 10,
			pauseOnHover: true,
		});
	} else {
		$toast.show({
			title: "Erreur lors de l'ajout de la permission",
			type: 'danger',
			timeout: 10,
			pauseOnHover: true,
		});
	}
};

const ALL_PERMISSIONS: { name: string; operations: { name: string }[] }[] = [
	{
		name: 'dashboard',
		operations: [{ name: 'manage' }],
	},
	{
		name: 'categories',
		operations: [
			{ name: 'manage' },
			{ name: 'create' },
			{ name: 'delete' },
			{ name: 'remove' },
			{ name: 'update' },
		],
	},
	{
		name: 'articles',
		operations: [
			{ name: 'manage' },
			{ name: 'create' },
			{ name: 'delete' },
			{ name: 'remove' },
			{ name: 'update' },
		],
	},
	{
		name: 'comments',
		operations: [
			{ name: 'manage' },
			{ name: 'moderate' },
			{ name: 'create' },
			{ name: 'delete' },
			{ name: 'remove' },
			{ name: 'update' },
		],
	},
	{
		name: 'permissions',
		operations: [
			{ name: 'manage' },
			{ name: 'create' },
			{ name: 'delete' },
			{ name: 'remove' },
			{ name: 'update' },
		],
	},
	{
		name: 'roles',
		operations: [
			{ name: 'manage' },
			{ name: 'create' },
			{ name: 'delete' },
			{ name: 'remove' },
			{ name: 'update' },
		],
	},
	{
		name: 'users',
		operations: [{ name: 'manage' }, { name: 'update' }],
	},
	{
		name: 'user',
		operations: [{ name: 'manage' }],
	},
];

const addExistsField = (
	fullData: { name: string; operations: { name: string }[] }[],
	partialData: { name: string; operations: { name: string }[] }[]
) => {
	return fullData.map((fullItem) => {
		const operations = fullItem.operations.map((operation) => {
			const isAuthorized = partialData.some(
				(partialItem) =>
					partialItem.name === fullItem.name &&
					partialItem.operations.some(
						(partialOperation) =>
							partialOperation.name === operation.name
					)
			);

			return { ...operation, isAuthorized };
		});

		return { ...fullItem, operations };
	});
};
permissions = addExistsField(ALL_PERMISSIONS, permissions);
</script>
