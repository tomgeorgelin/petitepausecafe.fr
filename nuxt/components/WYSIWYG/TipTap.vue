<template>
	<div class="editor" v-if="editor">
		<WYSIWYGMenuBar class="editor__header" :editor="editor" />
		<editor-content :editor="editor" class="editor__content" />
	</div>
	<div>
		<div v-if="res" v-html="res"></div>
	</div>
</template>
<script>
import Heading from '@tiptap/extension-heading';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import StarterKit from '@tiptap/starter-kit';
import BulletList from '@tiptap/extension-bullet-list';
import Link from '@tiptap/extension-link';
import Highlight from '@tiptap/extension-highlight';
import { Editor, EditorContent } from '@tiptap/vue-3';
import { mergeAttributes } from '@tiptap/core';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import { lowlight } from 'lowlight';

lowlight.registerLanguage('html', html);
lowlight.registerLanguage('css', css);
lowlight.registerLanguage('js', js);
lowlight.registerLanguage('ts', ts);
export default {
	props: {
		updateBody: {
			type: Function,
			required: true,
		},
		body: {
			type: String,
			required: true,
		},
	},
	components: {
		EditorContent,
	},
	data() {
		return {
			editor: null,
			res: '',
		};
	},
	setup(props) {
		onMounted(() => {
			getCurrentInstance().data.editor = new Editor({
				content: props.body,
				extensions: [
					StarterKit.configure({
						heading: false,
						bulletList: false,
						bold: {
							HTMLAttributes: {
								class: 'font-semibold',
							},
						},
						code: {
							HTMLAttributes: {
								class: 'rounded-lg p-2 bg-black text-white',
							},
						},
						codeBlock: {
							HTMLAttributes: {
								class: 'rounded-lg p-2 bg-black text-white',
							},
						},
					}),
					TextStyle,
					Color,
					TextAlign.configure({
						types: ['heading', 'paragraph'],
					}),
					Underline.configure({
						types: ['heading', 'paragraph'],
					}),
					Heading.configure({ levels: [1, 2] }).extend({
						levels: [1, 2],
						renderHTML({ node, HTMLAttributes }) {
							const level = this.options.levels.includes(
								node.attrs.level
							)
								? node.attrs.level
								: this.options.levels[0];
							const classes = {
								1: 'text-4xl',
								2: 'text-2xl',
							};
							return [
								`h${level}`,
								mergeAttributes(
									this.options.HTMLAttributes,
									HTMLAttributes,
									{
										class: `${classes[level]}`,
									}
								),
								0,
							];
						},
					}),
					BulletList.configure({
						itemTypeName: 'listItem',
						HTMLAttributes: {
							class: 'list-disc',
						},
					}),
					Link.configure({
						HTMLAttributes: {
							class: 'text-tint hover:underline decoration-tint',
						},
					}),
					Highlight.configure({
						multicolor: true,
					}),
				],
				onUpdate: ({ editor }) => {
					// this.res = editor.getHTML();
					props.updateBody(editor.getHTML());
					// this.$emit('update:res', editor.getHTML());
				},
			});
		});
	},
	beforeUnmount() {
		this.editor.destroy();
	},
};
</script>

<style lang="scss">
.editor {
	background-color: white;
	display: flex;
	flex-direction: column;
	max-height: 26rem;
	color: #0d0d0d;
	background-color: #fff;
	border: 1px solid #ff5480;
	border-radius: 0.75rem;

	&__header {
		display: flex;
		align-items: center;
		flex: 0 0 auto;
		flex-wrap: wrap;
		padding: 0.25rem;
		border-bottom: 1px solid #b9b9b9;
	}

	&__content {
		padding: 1.25rem 1rem;
		flex: 1 1 auto;
		overflow-x: hidden;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
	}

	&__footer {
		display: flex;
		flex: 0 0 auto;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		white-space: nowrap;
		border-top: 1px solid #b9b9b9;
		font-size: 12px;
		font-weight: 600;
		color: #0d0d0d;
		white-space: nowrap;
		padding: 0.25rem 0.75rem;
	}

	/* Some information about the status */
	&__status {
		display: flex;
		align-items: center;
		border-radius: 5px;

		&::before {
			content: ' ';
			flex: 0 0 auto;
			display: inline-block;
			width: 0.5rem;
			height: 0.5rem;
			background: rgba(#0d0d0d, 0.5);
			border-radius: 50%;
			margin-right: 0.5rem;
		}

		&--connecting::before {
			background: #616161;
		}

		&--connected::before {
			background: #b9f18d;
		}
	}

	&__name {
		button {
			background: none;
			border: none;
			font: inherit;
			font-size: 12px;
			font-weight: 600;
			color: #0d0d0d;
			border-radius: 0.4rem;
			padding: 0.25rem 0.5rem;

			&:hover {
				color: #fff;
				background-color: #0d0d0d;
			}
		}
	}
}
</style>
<style lang="scss">
.editor {
	display: flex;
	flex-direction: column;
	max-height: 26rem;
	color: #0d0d0d;
	background-color: #fff;
	border: 1px solid #ff5480;
	border-radius: 0.75rem;

	&__header {
		display: flex;
		align-items: center;
		flex: 0 0 auto;
		flex-wrap: wrap;
		padding: 0.25rem;
		border-bottom: 1px solid #ff5480;
	}

	&__content {
		padding: 1.25rem 1rem;
		flex: 1 1 auto;
		overflow-x: hidden;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
	}

	&__footer {
		display: flex;
		flex: 0 0 auto;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		white-space: nowrap;
		border-top: 1px solid #0d0d0d;
		font-size: 12px;
		font-weight: 600;
		color: #0d0d0d;
		white-space: nowrap;
		padding: 0.25rem 0.75rem;
	}

	/* Some information about the status */
	&__status {
		display: flex;
		align-items: center;
		border-radius: 5px;

		&::before {
			content: ' ';
			flex: 0 0 auto;
			display: inline-block;
			width: 0.5rem;
			height: 0.5rem;
			background: rgba(#0d0d0d, 0.5);
			border-radius: 50%;
			margin-right: 0.5rem;
		}

		&--connecting::before {
			background: #616161;
		}

		&--connected::before {
			background: #b9f18d;
		}
	}

	&__name {
		button {
			background: none;
			border: none;
			font: inherit;
			font-size: 12px;
			font-weight: 600;
			color: #0d0d0d;
			border-radius: 0.4rem;
			padding: 0.25rem 0.5rem;

			&:hover {
				color: #fff;
				background-color: #0d0d0d;
			}
		}
	}
}
</style>
<style lang="scss">
/* Basic editor styles */
.ProseMirror {
	> * + * {
		margin-top: 0.75em;
	}

	ul,
	ol {
		padding: 0 1rem;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		line-height: 1.1;
	}

	code {
		background-color: rgba(#616161, 0.1);
		color: #616161;
	}

	pre {
		background: #0d0d0d;
		color: #fff;
		font-family: 'JetBrainsMono', monospace;
		padding: 0.75rem 1rem;
		border-radius: 0.5rem;

		code {
			color: inherit;
			padding: 0;
			background: none;
			font-size: 0.8rem;
		}
	}

	mark {
		background-color: #faf594;
	}

	img {
		max-width: 100%;
		height: auto;
	}

	hr {
		margin: 1rem 0;
	}

	blockquote {
		padding-left: 1rem;
		border-left: 2px solid rgba(#0d0d0d, 0.1);
	}

	hr {
		border: none;
		border-top: 2px solid rgba(#0d0d0d, 0.1);
		margin: 2rem 0;
	}

	ul[data-type='taskList'] {
		list-style: none;
		padding: 0;

		li {
			display: flex;
			align-items: center;
		}
	}
}
</style>
