import logging
import os
from dotenv import load_dotenv
from livekit.agents import JobContext, AutoSubscribe, multimodal, llm
from livekit.plugins import google
from livekit.agents import WorkerOptions, cli, WorkerType

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()

instructions = "You are a helpful assistant, greet the user and help them with their trip planning"


async def entrypoint(ctx: JobContext):
    await ctx.connect(auto_subscribe=AutoSubscribe.SUBSCRIBE_ALL)
    await ctx.agent.set_name("Agent")
    logger.info(f"Connected to room {ctx.room.name} as {ctx.agent.name}")

    api_key = os.environ.get("GOOGLE_API_KEY")
    model = google.beta.realtime.RealtimeModel(
        model="gemini-2.0-flash-001", voice="Kore", temperature=0.8, instructions=instructions, api_key=api_key
    )
    chat_ctx = llm.ChatContext()

    agent = multimodal.MultimodalAgent(model=model, chat_ctx=chat_ctx)  # type: ignore
    participant = await ctx.wait_for_participant()
    agent.start(room=ctx.room, participant=participant)
    agent.generate_reply()


if __name__ == "__main__":
    opts = WorkerOptions(entrypoint_fnc=entrypoint, agent_name="qualeasy", worker_type=WorkerType.ROOM)
    logger.info("Starting agent worker")
    cli.run_app(opts=opts)
