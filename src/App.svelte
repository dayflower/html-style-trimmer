<script lang="ts">
  import { Button, Heading, Toast } from 'flowbite-svelte';
  import {
    CheckCircleSolid,
    ClipboardSolid,
    TrashBinSolid,
    WandSparklesSolid,
  } from 'flowbite-svelte-icons';
  import { fly } from 'svelte/transition';

  let editor: HTMLDivElement;
  let toastOpen: boolean = false;

  const walk = (el: HTMLElement, keep: boolean): string => {
    let result = '';

    result += el.tagName;

    const children: string[] = [];
    for (const node of el.childNodes) {
      if (node instanceof HTMLElement) {
        children.push(walk(node, false));
      }
    }

    result += ` (${children.join(', ')})\n`;

    if (!keep) {
      ['style', 'class', 'id'].forEach((attr) => {
        el.removeAttribute(attr);
      });
    }

    return result;
  };

  const trimStyles = () => {
    walk(editor, true);
  };

  const copyFromEditor = async () => {
    const html = editor.innerHTML;
    const item = new ClipboardItem({
      'text/html': new Blob([html], { type: 'text/html' }),
      'text/plain': new Blob([html], { type: 'text/plain' }),
    });

    await navigator.clipboard.write([item]);

    setTimeout(() => {
      toastOpen = false;
    }, 1300);
    toastOpen = true;
  };

  const clear = () => {
    editor.innerHTML = '';
  };
</script>

<main class="m-10">
  <Heading tag="h1">HTML style trimmer</Heading>

  <div class="my-8">
    <div
      id="editor"
      bind:this={editor}
      contenteditable={true}
      class="overflow-y-scroll overflow-x-auto h-96 p-3 border rounded-sm"
    />
  </div>

  <Button on:click={trimStyles}>
    <WandSparklesSolid class="w-4 h-4 mr-2" />
    Tidy up
  </Button>

  <Button on:click={copyFromEditor} color="alternative">
    <ClipboardSolid class="w-4 h-4 mr-2" />
    Copy
  </Button>

  <Button on:click={clear} color="dark" class="ml-10">
    <TrashBinSolid class="w-4 h-4 mr-2" />
    Clear
  </Button>

  <Toast
    bind:open={toastOpen}
    position="top-right"
    color="green"
    transition={fly}
    params={{ x: 200 }}
  >
    <svelte:fragment slot="icon">
      <CheckCircleSolid class="w-5 h-5" />
    </svelte:fragment>
    Copied</Toast
  >
</main>

<style>
</style>
