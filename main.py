import argparse
from src.converter import converter

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("filepath", help="select a Markdown file to convert", type=str)
    parser.add_argument(
        "--watch",
        help="watch the file for changes, requires watchdog library",
        action=argparse.BooleanOptionalAction,
    )
    args = parser.parse_args()

    if args.watch:
        print("watching file for changes")
        import time
        from watchdog.events import FileSystemEvent, FileSystemEventHandler
        from watchdog.observers import Observer

        class EventHandler(FileSystemEventHandler):
            def on_any_event(self, _event: FileSystemEvent) -> None:
                global last_time
                cur_time = time.time()
                if cur_time - last_time > 1:
                    converter(args.filepath)
                    last_time = cur_time

        last_time = time.time()
        event_handler = EventHandler()
        observer = Observer()
        observer.schedule(event_handler, args.filepath, recursive=True)
        observer.start()
        try:
            while True:
                time.sleep(1)
        finally:
            observer.stop()
            observer.join()
    else:
        converter(args.filepath)
