import * as core from "@actions/core";
import { context, getOctokit } from "@actions/github";

const githubToken = core.getInput("github-token", { required: true });
if (!githubToken) {
  throw new Error("GITHUB_TOKEN is not provided");
}
const github = getOctokit(githubToken);

export async function postToPull(): Promise<void> {
  try {
    // Retrieve the existing comments on the PR
    const { data: comments } = await github.rest.issues.listComments({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: context.issue.number,
    });

    // Identify a comment made by the bot (replace with actual bot's user ID)
    const botComment = comments.find((comment) => comment.user?.id === 41898282);
    const commentBody = `Hello from actions/github-script! (${context.sha})`;

    if (botComment) {
      // Update existing comment
      await github.rest.issues.updateComment({
        owner: context.repo.owner,
        repo: context.repo.repo,
        comment_id: botComment.id,
        body: commentBody,
      });
    } else {
      // Create a new comment
      await github.rest.issues.createComment({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: context.issue.number,
        body: commentBody,
      });
    }
  } catch (error) {
    core.setFailed(`Action failed with error: ${(error as Error).message}`);
  }
}
