<template>
	<div>
		<template v-for="(item, index) in items">
			<div
				class="divider"
				v-if="item.type === 'divider'"
				:key="`divider${index}`"
			></div>
			<WYSIWYGMenuItem v-else :key="index" v-bind="item" />
		</template>
	</div>
</template>

<script>
export default {
	props: {
		editor: {
			type: Object,
			required: true,
		},
	},

	data() {
		return {
			items: [
				{
					icon: 'bold',
					title: 'Bold',
					action: () =>
						this.editor.chain().focus().toggleBold().run(),
					isActive: () => this.editor.isActive('bold'),
				},
				{
					icon: 'italic',
					title: 'Italic',
					action: () =>
						this.editor.chain().focus().toggleItalic().run(),
					isActive: () => this.editor.isActive('italic'),
				},
				{
					icon: 'strikethrough',
					title: 'Strike',
					action: () =>
						this.editor.chain().focus().toggleStrike().run(),
					isActive: () => this.editor.isActive('strike'),
				},
				{
					icon: 'underline',
					title: 'Underline',
					action: () =>
						this.editor.chain().focus().toggleUnderline().run(),
					isActive: () => this.editor.isActive('underline'),
				},
				{
					type: 'divider',
				},
				{
					icon: 'highlight',
					title: 'Highlight',
					action: () => {
						this.editor
							.chain()
							.focus()
							.toggleHighlight({ color: '#FF5480' })
							.run();
					},
					isActive: () => this.editor.isActive('highlight'),
				},
				{
					type: 'divider',
				},
				{
					icon: 'h-1',
					title: 'Heading 1',
					action: () =>
						this.editor
							.chain()
							.focus()
							.toggleHeading({ level: 1 })
							.run(),
					isActive: () =>
						this.editor.isActive('heading', { level: 1 }),
				},
				{
					icon: 'h-2',
					title: 'Heading 2',
					action: () =>
						this.editor
							.chain()
							.focus()
							.toggleHeading({ level: 2 })
							.run(),
					isActive: () =>
						this.editor.isActive('heading', { level: 2 }),
				},
				{
					icon: 'paragraph',
					title: 'Paragraph',
					action: () =>
						this.editor.chain().focus().setParagraph().run(),
					isActive: () => this.editor.isActive('paragraph'),
				},
				{
					type: 'divider',
				},
				{
					icon: 'code-view',
					title: 'Code',
					action: () =>
						this.editor.chain().focus().toggleCode().run(),
					isActive: () => this.editor.isActive('code'),
				},
				{
					icon: 'code-box-line',
					title: 'Code Block',
					action: () =>
						this.editor.chain().focus().toggleCodeBlock().run(),
					isActive: () => this.editor.isActive('codeBlock'),
				},
				{
					type: 'divider',
				},
				{
					icon: 'text-align',
					title: 'Align Left',
					action: () =>
						this.editor.chain().focus().setTextAlign('left').run(),
				},
				{
					icon: 'text-align',
					title: 'Align Center',
					action: () =>
						this.editor
							.chain()
							.focus()
							.setTextAlign('center')
							.run(),
				},
				{
					icon: 'text-align',
					title: 'Align Right',
					action: () =>
						this.editor.chain().focus().setTextAlign('right').run(),
				},
				{
					icon: 'text-align',
					title: 'Align Justify',
					action: () =>
						this.editor
							.chain()
							.focus()
							.setTextAlign('justify')
							.run(),
				},
				{
					type: 'divider',
				},
				{
					icon: 'link',
					title: 'Set link',
					action: () => this.setLink(),
					isActive: () => this.editor.isActive('link'),
				},
				{
					icon: 'unset-link',
					title: 'Unset link',
					action: () => this.editor.chain().focus().unsetLink().run(),
					isActive: () => this.editor.isActive('unset-link'),
				},
				{
					type: 'divider',
				},
				{
					icon: 'list-unordered',
					title: 'Bullet List',
					action: () =>
						this.editor.chain().focus().toggleBulletList().run(),
					isActive: () => this.editor.isActive('bulletList'),
				},
				{
					type: 'divider',
				},
				{
					icon: 'arrow-go-back-line',
					title: 'Undo',
					action: () => this.editor.chain().focus().undo().run(),
				},
				{
					icon: 'arrow-go-forward-line',
					title: 'Redo',
					action: () => this.editor.chain().focus().redo().run(),
				},
			],
		};
	},
	methods: {
		setLink() {
			const previousUrl = this.editor.getAttributes('link').href;
			const url = window.prompt('URL', previousUrl);

			// cancelled
			if (url === null) {
				return;
			}

			// empty
			if (url === '') {
				this.editor
					.chain()
					.focus()
					.extendMarkRange('link')
					.unsetLink()
					.run();

				return;
			}

			// update link
			this.editor
				.chain()
				.focus()
				.extendMarkRange('link')
				.setLink({ href: url })
				.run();
		},
	},
};
</script>

<style lang="scss">
.divider {
	width: 2px;
	height: 1.25rem;
	background-color: rgba(#000, 0.1);
	margin-left: 0.5rem;
	margin-right: 0.75rem;
}
</style>
