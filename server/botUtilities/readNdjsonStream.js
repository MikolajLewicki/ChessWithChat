            /// reader from https://gist.github.com/ornicar/a097406810939cf7be1df8ea30e94f3e
            const readStream = processLine => response => {
                const matcher = /\r?\n/;
                const decoder = new TextDecoder();
                let buf = '';
                return new Promise((resolve, fail) => {
                  response.body.on('data', v => {
                    const chunk = decoder.decode(v, { stream: true });
                    buf += chunk;
              
                    const parts = buf.split(matcher);
                    buf = parts.pop();
                    for (const i of parts.filter(p => p)) processLine(JSON.parse(i));
                  });
                  response.body.on('end', () => {
                    if (buf.length > 0) processLine(JSON.parse(buf));
                    resolve();
                  });
                  response.body.on('error', fail);
                });
              };

              export default readStream