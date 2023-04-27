module.exports = {
	apps: [
		{
			name: 'petitepausecafe',
			port: '443',
			exec_mode: 'cluster',
			instances: 'max',
			script: './.output/server/index.mjs',
		},
	],
};
